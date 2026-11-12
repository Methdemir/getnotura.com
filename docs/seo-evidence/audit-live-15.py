import concurrent.futures, json, urllib.request, urllib.error, re, subprocess
from html.parser import HTMLParser
from pathlib import Path
paths=['/momentback/tr/terms/','/999kb/tr/','/jutsu/tr/privacy/','/999kb/tr/privacy/','/momentback/privacy/','/momentback/terms/','/999kb/privacy/','/momentback/tr/','/jutsu/privacy/','/vergi-hesabim/','/momentback/','/jutsu/','/kimo/','/vergi-hesabim/privacy/','/']
origin='https://sarperstudios.com'
class Parser(HTMLParser):
 def __init__(self): super().__init__(); self.canonical=[]; self.robots=[]; self.alternates=[]; self.links=[]; self.lang=None; self.text=[]; self.skip=0
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='html': self.lang=a.get('lang')
  if tag=='meta' and a.get('name','').lower() in ['robots','googlebot']: self.robots.append(a.get('content'))
  if tag=='link' and a.get('rel')=='canonical': self.canonical.append(a.get('href'))
  if tag=='link' and a.get('hreflang'): self.alternates.append({'lang':a['hreflang'],'href':a.get('href')})
  if tag=='a' and a.get('href'): self.links.append(a['href'])
  if tag in ['script','style','head']: self.skip+=1
 def handle_endtag(self,tag):
  if tag in ['script','style','head']: self.skip=max(0,self.skip-1)
 def handle_data(self,data):
  if not self.skip: self.text.append(data)
def fetch(path):
 raw=subprocess.check_output(['curl.exe','-sS','--max-time','35','-L','-D','-',origin+path]).decode('utf-8','replace')
 blocks=re.split(r'\r?\n\r?\n',raw)
 head=blocks[0]; body='\n\n'.join(blocks[1:]); status=int(head.split()[1]); headers=dict(re.findall(r'^([^:\r\n]+):\s*(.*)$',head,re.M)); final=origin+path
 p=Parser(); p.feed(body)
 return {'path':path,'url':origin+path,'status':status,'final':final,'xRobots':headers.get('X-Robots-Tag'),'robots':p.robots,'canonical':p.canonical,'alternates':p.alternates,'lang':p.lang,'visibleCharacters':len(' '.join(p.text)),'internalLinks':[x for x in p.links if x.startswith('/')],'soft404Text':bool(re.search('page not found|sayfa bulunamad',body,re.I))}
sitemap=subprocess.check_output(['curl.exe','-sS',origin+'/sitemap.xml']).decode()
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool: results=list(pool.map(fetch,paths))
all_links=set(x for row in results for x in row['internalLinks'])
for row in results:
 row['inSitemap']=row['url'] in re.findall(r'<loc>(.*?)</loc>',sitemap)
 row['inboundFromAuditedPages']=sum(row['path'] in x['internalLinks'] for x in results)
out={'checkedAt':'2026-11-12','source':'Search Console CAMYFyAC report, displayed last update 2026-11-09; all 15 example rows read in authenticated UI','results':results}
p=Path(__file__).resolve().parent;p.mkdir(parents=True,exist_ok=True)
(p/'live-before-15.json').write_text(json.dumps(out,indent=2,ensure_ascii=False),encoding='utf-8')
for r in results: print(json.dumps({k:r[k] for k in ['path','status','robots','canonical','inSitemap','visibleCharacters','inboundFromAuditedPages']},ensure_ascii=False))
