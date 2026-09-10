const CACHE_NAME='cruzada-eterna-v22';
const CORE=['./','./index.html','./styles.css','./menu-redesign.css','./menu-redesign.js','./ambient-music.js','./bestiario-art.js','./equipo-extra.js','./assets/nigromante-inline.js','./assets/esqueleto-arquero-inline.js','./assets/zombi-inline.js','./assets/necrofago-inline.js','./assets/campeon-tumulario-inline.js','./assets/campeon-tumulario-bestiario.svg','./manifest.webmanifest','./assets/icon-cruzada.svg','./assets/nigromante-bestiario.webp','./assets/esqueleto-bestiario.jpg','./assets/esqueleto-arquero-bestiario.jpg'];
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
    if(/necrofago-inline\.js(?:\?v=\d+)?/i.test(html))html=html.replace(/necrofago-inline\.js(?:\?v=\d+)?/ig,'necrofago-inline.js?v=5');
    else html=html.replace(/<\/body>/i,'<script src="./assets/necrofago-inline.js?v=5"></script></body>');
    if(/campeon-tumulario-inline\.js(?:\?v=\d+)?/i.test(html))html=html.replace(/campeon-tumulario-inline\.js(?:\?v=\d+)?/ig,'campeon-tumulario-inline.js?v=2');
    else html=html.replace(/<\/body>/i,'<script src="./assets/campeon-tumulario-inline.js?v=2"></script></body>');
    if(/bestiario-art\.js(?:\?v=\d+)?/i.test(html))html=html.replace(/bestiario-art\.js(?:\?v=\d+)?/ig,'bestiario-art.js?v=14');
    else html=html.replace(/<\/body>/i,'<script src="./bestiario-art.js?v=14"></script></body>');
    if(!html.includes('equipo-extra.js'))html=html.replace(/<\/body>/i,'<script src="./equipo-extra.js?v=1"></script></body>');
    if(!html.includes('data-campeon-directo'))html=html.replace(/<\/body>/i,'<script data-campeon-directo>(function(){function poner(){var c=document.getElementById("content");if(!c)return;var h=c.querySelector("h2");if(!h||h.textContent.trim()!=="Campeón Tumulario")return;if(c.querySelector(".campeon-directo"))return;var s=c.querySelector(".hero-subtitle");if(!s)return;var w=document.createElement("div");w.className="campeon-directo";w.style.cssText="margin:12px auto 18px;max-width:560px;border:1px solid #6d4e2d;border-radius:10px;overflow:hidden;background:#0d0907;box-shadow:0 8px 24px rgba(0,0,0,.45)";var i=document.createElement("img");i.src="./assets/campeon-tumulario-bestiario.svg?v=2";i.alt="Ilustración del Campeón Tumulario";i.style.cssText="display:block;width:100%;height:auto";w.appendChild(i);s.insertAdjacentElement("afterend",w)}document.addEventListener("click",function(){setTimeout(poner,20)});document.addEventListener("DOMContentLoaded",poner);setTimeout(poner,100)})();</script></body>');
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
