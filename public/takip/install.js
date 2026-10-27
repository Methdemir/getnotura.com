let promptEvent;
const button=document.getElementById('install');
const hint=document.getElementById('install-hint');
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();promptEvent=e;});
window.addEventListener('appinstalled',()=>{document.getElementById('install-bar').hidden=true;});
button.addEventListener('click',async()=>{if(promptEvent){await promptEvent.prompt();await promptEvent.userChoice;promptEvent=null;}else{hint.textContent=/iPad|iPhone|iPod/.test(navigator.userAgent)?'Safari: Paylaş → Ana Ekrana Ekle':'Tarayıcı menüsü → Uygulamayı yükle / Ana ekrana ekle';}});
if('serviceWorker' in navigator)navigator.serviceWorker.register('/takip/sw.js',{scope:'/takip/'}).catch(()=>{hint.textContent='Kurulum için tarayıcı menüsünden Ana ekrana ekle seçeneğini kullan.';});
