import {readFile,writeFile} from 'node:fs/promises';
const root=process.argv[2] || new URL('../../../notura-standalone-20261112/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const lines=(await readFile(root+'dist/_redirects','utf8')).split(/\r?\n/).filter(x=>x&&!x.startsWith('#'));
const results=[];
for(const line of lines){
 let [path,location,code]=line.split(/\s+/);
 if(path.includes('*')){path=path.replace('*','manifest.webmanifest');location=location.replace(':splat','manifest.webmanifest');}
 const r=await fetch('http://127.0.0.1:8792'+path,{redirect:'manual'});
 results.push({path,status:r.status,location:r.headers.get('location'),expectedLocation:location,pass:r.status===Number(code)&&r.headers.get('location')===location});await r.body?.cancel();
}
const sitemap=await readFile(root+'dist/sitemap.xml','utf8');
for(const [,url] of sitemap.matchAll(/<loc>(.*?)<\/loc>/g)){
 const path=new URL(url).pathname,r=await fetch('http://127.0.0.1:8792'+path,{redirect:'manual'}),html=await r.text();
 results.push({path,status:r.status,pass:r.status===200&&html.includes('content="noindex,follow"')&&html.includes(`href="${url}"`)});
}
for(const path of ['/unknown/','/notura/unknown/']){const r=await fetch('http://127.0.0.1:8792'+path,{redirect:'manual'});results.push({path,status:r.status,pass:r.status===404});await r.body?.cancel();}
const r=await fetch('http://127.0.0.1:8792/app-ads.txt');const ads=await r.text();results.push({path:'/app-ads.txt',status:r.status,pass:r.status===200&&ads.includes('google.com, pub-8687761371122116, DIRECT, f08c47fec0942fa0')});
const out={base:'http://127.0.0.1:8792',commit:'8cecfb8a67deac7cdb6c5dd7662e4c8a432cba05',checkedAt:new Date().toISOString(),passed:results.filter(x=>x.pass).length,failed:results.filter(x=>!x.pass).length,results};
await writeFile(new URL('./notura-local-http.json', import.meta.url),JSON.stringify(out,null,2)+'\n');
console.log(JSON.stringify({...out,results:out.results.filter(x=>!x.pass)},null,2));if(out.failed)process.exitCode=1;
