(()=>{
  function addCarcaj(){
    const items=document.querySelector('#magicos .items');
    if(!items||[...items.querySelectorAll('h3')].some(h=>h.textContent.trim()==='Carcaj de Puntas Afiladas'))return;
    const article=document.createElement('article');
    article.className='item magic';
    article.innerHTML='<h3>Carcaj de Puntas Afiladas</h3><div class="meta"><span class="price">200 coronas</span><span>Objeto mágico</span><span>1 vez por partida</span></div><p><b>Puntas Afiladas:</b> Una vez por partida, el portador puede usar el carcaj para obtener 1D6 flechas de puntas afiladas. Cada una de estas flechas otorga +2 a la Fuerza del ataque a distancia realizado con ella. Las flechas obtenidas se pierden al finalizar la partida.</p>';
    items.appendChild(article);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',addCarcaj);else addCarcaj();
})();
