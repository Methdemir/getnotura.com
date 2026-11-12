import subprocess,json,concurrent.futures,re
from pathlib import Path
root=Path(__file__).resolve().parents[2]
locales=json.loads((root/'src/i18n/locales.json').read_text(encoding='utf-8'))
routes=json.loads((root/'src/i18n/routes.json').read_text(encoding='utf-8'))
paths=['/notura/']+['/notura/'+l['urlPrefix']+'/'+(routes[d]['path']+'/' if routes[d]['path'] else '') for l in locales if l['publicationStatus']=='published' for d in ['home','product','howItWorks','features','privacy','terms']]
def check(p):
 raw=subprocess.check_output(['curl.exe','-sS','--max-time','30','-D','-','https://sarperstudios.com'+p]).decode('utf-8','replace')
 head,body=re.split(r'\r?\n\r?\n',raw,maxsplit=1)
 return {'path':p,'status':int(head.split()[1]),'location': next((x.split(':',1)[1].strip() for x in head.splitlines() if x.lower().startswith('location:')),None),'noindex':bool(re.search(r'content="noindex,follow"',body)),'expectedLocation':'https://getnotura.com'+p.removeprefix('/notura')}
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool: out=list(pool.map(check,paths))
(root/'docs/seo-evidence/notura-live-before-43.json').write_text(json.dumps(out,indent=2),encoding='utf-8')
print(json.dumps({'tested':len(out),'status200':sum(x['status']==200 for x in out),'status301':sum(x['status']==301 for x in out),'noindex':sum(x['noindex'] for x in out),'other': [x for x in out if x['status']!=200]},indent=2))
