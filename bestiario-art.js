(function(){
'use strict';
if(window.__cruzadaBestiarioArtLoaded)return;
window.__cruzadaBestiarioArtLoaded=true;
const ART={
  'Nigromante':'./assets/nigromante-bestiario.webp?v=3',
  'Esqueleto':'./assets/esqueleto-bestiario.jpg?v=1',
  'Esqueleto Arquero':'./assets/esqueleto-arquero-bestiario.jpg?v=3',
  'Necrófago':'./assets/file_00000000dc1481f4950a9034a57a671e.png?v=1',
  'Campeón Tumulario':'./assets/file_00000000facc824688830fb99173f787.png?v=1',
  'Rey Tumulario':'./assets/file_000000003b108210a46465153cbdfa6e.png?v=1',
  'Espectro':'./assets/file_000000001f7c8243bf4311918e08aeb4.png?v=1',
  'Vaegulf':'./assets/f4b66599b5cbd759ac89a1c94d26a844.jpg?v=1',
  'Azharok el Imperecedero':'./assets/Screenshot_2026-09-17-22-15-32-735_com.miui.gallery-edit.jpg?v=1',
  'Varkhos':'./assets/file_0000000048c081f4813d1324508b560c.png?v=1'
};
function applyArt(){
  const content=document.getElementById('content');
  if(!content)return;
  const title=content.querySelector('h2');
  if(!title)return;
  const name=(title.textContent||'').trim();
  const src=(name==='Nigromante'&&window.__nigromanteInline)||(name==='Esqueleto Arquero'&&window.__esqueletoArqueroInline)||(name==='Zombi'&&window.__zombiInline)||ART[name];
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
