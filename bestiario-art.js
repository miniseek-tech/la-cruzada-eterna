(function(){
'use strict';
if(window.__cruzadaBestiarioArtLoaded)return;
window.__cruzadaBestiarioArtLoaded=true;
const ART={
  'Nigromante':'./assets/nigromante-bestiario.webp?v=3',
  'Esqueleto':'./assets/esqueleto-bestiario.jpg?v=1',
  'Esqueleto Arquero':'./assets/esqueleto-arquero-bestiario.jpg?v=3'
};
let necrofagoLoading=false;
function ensureNecrofagoArt(){
  if(window.__necrofagoInline||necrofagoLoading)return;
  necrofagoLoading=true;
  const script=document.createElement('script');
  script.src='./assets/necrofago-inline.js?v=4';
  script.onload=()=>{necrofagoLoading=false;applyArt();};
  script.onerror=()=>{necrofagoLoading=false;};
  document.head.appendChild(script);
}
function applyArt(){
  const content=document.getElementById('content');
  if(!content)return;
  const title=content.querySelector('h2');
  if(!title)return;
  const name=(title.textContent||'').trim();
  if(name==='Necrófago'&&!window.__necrofagoInline){ensureNecrofagoArt();return;}
  const src=(name==='Nigromante'&&window.__nigromanteInline)||(name==='Esqueleto Arquero'&&window.__esqueletoArqueroInline)||(name==='Zombi'&&window.__zombiInline)||(name==='Necrófago'&&window.__necrofagoInline)||ART[name];
  const old=content.querySelector('.enemy-art');
  if(!src){if(old)old.remove();return}
  if(old&&old.dataset.enemy===name)return;
  if(old)old.remove();
  const wrap=document.createElement('div');
  wrap.className='enemy-art';
  wrap.dataset.enemy=name;
  wrap.style.cssText='margin:12px auto 18px;max-width:560px;border:1px solid #6d4e2d;border-radius:10px;overflow:hidden;background:#0d0907;box-shadow:0 8px 24px rgba(0,0,0,.45)';
  const img=document.createElement('img');
  img.src=src;
  img.alt='Ilustración del '+name;
  img.loading='eager';
  img.decoding='async';
  img.style.cssText='display:block;width:100%;height:auto;object-fit:cover';
  wrap.appendChild(img);
  const subtitle=content.querySelector('.hero-subtitle');
  if(subtitle)subtitle.insertAdjacentElement('afterend',wrap);else title.insertAdjacentElement('afterend',wrap);
}
function init(){
  applyArt();
  const content=document.getElementById('content');
  if(content)new MutationObserver(applyArt).observe(content,{childList:true,subtree:true});
  document.addEventListener('click',()=>setTimeout(applyArt,0));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
