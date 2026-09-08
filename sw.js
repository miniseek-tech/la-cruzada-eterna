const CACHE_NAME='cruzada-eterna-v2';
const CORE=['./','./index.html','./styles.css','./menu-redesign.css','./menu-redesign.js','./ambient-music.js','./manifest.webmanifest','./assets/icon-cruzada.svg'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
function injectMusic(response){
  if(!response||!response.ok)return Promise.resolve(response);
  const type=response.headers.get('content-type')||'';
  if(!type.includes('text/html'))return Promise.resolve(response);
  return response.text().then(html=>{
    if(!html.includes('ambient-music.js'))html=html.replace(/<\/body>/i,'<script src="./ambient-music.js?v=1" data-cruzada-music="1"></script></body>');
    const headers=new Headers(response.headers);headers.delete('content-length');headers.delete('content-encoding');headers.set('content-type','text/html; charset=utf-8');
    return new Response(html,{status:response.status,statusText:response.statusText,headers});
  });
}
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  if(url.origin!==location.origin)return;
  if(request.mode==='navigate'){
    event.respondWith(fetch(request,{cache:'no-store'}).then(injectMusic).then(response=>{const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(request,copy));return response}).catch(()=>caches.match(request).then(r=>r||caches.match('./index.html')).then(injectMusic)));
    return;
  }
  event.respondWith(fetch(request).then(response=>{if(response&&response.ok){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(request,copy))}return response}).catch(()=>caches.match(request)));
});
