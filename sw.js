const CACHE_NAME='cruzada-eterna-v31';
const CORE=['./','./index.html','./styles.css','./menu-redesign.css','./menu-redesign.js','./ambient-music.js','./bestiario-art.js','./equipo-extra.js','./assets/nigromante-inline.js','./assets/esqueleto-arquero-inline.js','./assets/zombi-inline.js','./manifest.webmanifest','./assets/icon-cruzada.svg','./assets/nigromante-bestiario.webp','./assets/esqueleto-bestiario.jpg','./assets/esqueleto-arquero-bestiario.jpg','./assets/Screenshot_2026-09-17-22-15-32-735_com.miui.gallery-edit.jpg','./assets/file_0000000048c081f4813d1324508b560c.png','./assets/file_00000000dc1481f4950a9034a57a671e.png','./assets/file_00000000facc824688830fb99173f787.png','./assets/file_000000001f7c8243bf4311918e08aeb4.png','./assets/file_000000003b108210a46465153cbdfa6e.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
function injectMusic(response){
  if(!response||!response.ok)return Promise.resolve(response);
  const type=response.headers.get('content-type')||'';
  if(!type.includes('text/html'))return Promise.resolve(response);
  return response.text().then(html=>{
    if(!html.includes('ambient-music.js'))html=html.replace(/<\/body>/i,'<script src="./ambient-music.js?v=7" data-cruzada-music="1"></script></body>');
    else html=html.replace(/ambient-music\.js(?:\?v=\d+)?/ig,'ambient-music.js?v=7');
    if(!html.includes('nigromante-inline.js'))html=html.replace(/<\/body>/i,'<script src="./assets/nigromante-inline.js?v=1"></script></body>');
    if(!html.includes('esqueleto-arquero-inline.js'))html=html.replace(/<\/body>/i,'<script src="./assets/esqueleto-arquero-inline.js?v=1"></script></body>');
    if(!html.includes('zombi-inline.js'))html=html.replace(/<\/body>/i,'<script src="./assets/zombi-inline.js?v=1"></script></body>');
    if(/bestiario-art\.js(?:\?v=\d+)?/i.test(html))html=html.replace(/bestiario-art\.js(?:\?v=\d+)?/ig,'bestiario-art.js?v=21');
    else html=html.replace(/<\/body>/i,'<script src="./bestiario-art.js?v=21"></script></body>');
    if(!html.includes('equipo-extra.js'))html=html.replace(/<\/body>/i,'<script src="./equipo-extra.js?v=1"></script></body>');
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
  event.respondWith(fetch(request,{cache:'no-store'}).then(response=>{if(response&&response.ok){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(request,copy))}return response}).catch(()=>caches.match(request)));
});
