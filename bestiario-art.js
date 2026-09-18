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
  'Vaegulf':'./assets/f4b66599b5cbd759ac89a1c94d26a844.jpg?v=2',
  'Vargulf':'./assets/f4b66599b5cbd759ac89a1c94d26a844.jpg?v=2',
  'Varghulf':'./assets/f4b66599b5cbd759ac89a1c94d26a844.jpg?v=2',
  'Enjambre de Murciélagos':'./assets/file_00000000ed1882108da17d8fe0bd521c.png?v=2',
  'Enjambre de Ratas':'./assets/file_0000000034688210aaee6afca86471af.png?v=1',
  'Lobo Espectral':'./assets/file_00000000aadc8246b73edc862f5c59da.png?v=1',
  'Lobo Pútrido':'./assets/zombie_wolf_by_eedenartwork_dd03g83-pre.jpg?v=1',
  'Azharok el Imperecedero':'./assets/Screenshot_2026-09-17-22-15-32-735_com.miui.gallery-edit.jpg?v=1',
  'Varkhos':'./assets/file_0000000048c081f4813d1324508b560c.png?v=1',
  'Corsario Elfo Oscuro':'./assets/file_00000000b22881f4a6fd6919ff13f207.png?v=1',
  'Ballestero de Repetición':'./assets/ChatGPT Image 18 sept 2026, 10_29_09.png?v=1',
  'Elfa Bruja de Hag Graef':'./assets/a0ee9a2e-b59c-41ea-9db2-dc1fd25f7330.png?v=1',
  'Draelith Garra Sombría':'./assets/ChatGPT Image 18 sept 2026, 10_49_23.png?v=1',
  'Enano del Caos':'./assets/file_00000000eab482108f5688e903ac2ad6.png?v=1',
  'Ballestero Enano del Caos':'./assets/file_000000007c8882108cc12e8024bf0330.png?v=1',
  'Martillos Abismales':'./assets/a9059164-f0a4-4600-88d4-4af832d9b653.png?v=1',
  'Zharruk Quebrantahierro':'./assets/ChatGPT Image 18 sept 2026, 11_43_23.png?v=1',
  'Clakakr':'./assets/ChatGPT Image 18 sept 2026, 11_49_30.png?v=2'
};
function artFor(name){
  if(ART[name])return ART[name];
  const n=name.toLowerCase().replace(/[^a-záéíóúüñ]/g,'');
  if(n.includes('vaegulf')||n.includes('vargulf')||n.includes('varghulf'))return './assets/f4b66599b5cbd759ac89a1c94d26a844.jpg?v=2';
  if(n.includes('lobopútrido')||n.includes('loboputrido'))return './assets/zombie_wolf_by_eedenartwork_dd03g83-pre.jpg?v=1';
  if(n.includes('ballesteroderepetición')||n.includes('ballesteroderepeticion')||n.includes('ballesteroelfooscuro'))return './assets/ChatGPT Image 18 sept 2026, 10_29_09.png?v=1';
  if((n.includes('elfabruja')||n.includes('brujaelfa'))&&n.includes('haggraef'))return './assets/a0ee9a2e-b59c-41ea-9db2-dc1fd25f7330.png?v=1';
  if(n.includes('draelith')&&(n.includes('garrasombría')||n.includes('garrasombria')))return './assets/ChatGPT Image 18 sept 2026, 10_49_23.png?v=1';
  if(n==='enanodelcaos')return './assets/file_00000000eab482108f5688e903ac2ad6.png?v=1';
  if(n.includes('ballesteroenanodelcaos'))return './assets/file_000000007c8882108cc12e8024bf0330.png?v=1';
  if(n.includes('martillosabismales'))return './assets/a9059164-f0a4-4600-88d4-4af832d9b653.png?v=1';
  if(n.includes('zharrukquebrantahierro'))return './assets/ChatGPT Image 18 sept 2026, 11_43_23.png?v=1';
  if(n==='clakakr')return './assets/ChatGPT Image 18 sept 2026, 11_49_30.png?v=2';
  return null;
}
function applyArt(){
  const content=document.getElementById('content');
  if(!content)return;
  const title=content.querySelector('h2');
  if(!title)return;
  const name=(title.textContent||'').trim();
  const src=(name==='Nigromante'&&window.__nigromanteInline)||(name==='Esqueleto Arquero'&&window.__esqueletoArqueroInline)||(name==='Zombi'&&window.__zombiInline)||artFor(name);
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
