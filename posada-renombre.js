(function(){
  'use strict';

  const match=location.pathname.match(/posada(\d+)\.html$/i);
  if(!match)return;

  const missionNumber=Number(match[1]);
  const stateKey='cruzadaPosada'+missionNumber;
  const rewards=document.getElementById('rewards');
  if(!rewards)return;

  const box=document.createElement('div');
  box.className='renown-reward';
  box.style.cssText='margin-top:16px;padding-top:14px;border-top:1px solid #66513b';
  box.innerHTML='<p><b>🏆 Renombre de la compañía</b><br>Completar este contrato otorga <b>+1 Renombre</b>.</p><button type="button" class="hub-main-action" id="claimTavernRenown">AUMENTAR RENOMBRE +1</button><p id="tavernRenownStatus" class="note"></p>';
  rewards.appendChild(box);

  const button=box.querySelector('#claimTavernRenown');
  const status=box.querySelector('#tavernRenownStatus');

  function read(key,fallback){
    try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}
    catch(e){return fallback}
  }

  function isVictory(){
    const state=read(stateKey,{});
    return !!state.outcome&&state.outcome!=='defeat';
  }

  function refresh(){
    const campaign=read('cruzadaCampaign',null);
    const claimed=Array.isArray(campaign&&campaign.tavernRenownClaimed)
      &&campaign.tavernRenownClaimed.includes(missionNumber);
    box.hidden=rewards.hidden||!isVictory();
    button.disabled=!!claimed;
    button.textContent=claimed?'✓ RENOMBRE AÑADIDO':'AUMENTAR RENOMBRE +1';
    status.textContent=claimed?'Esta misión ya ha otorgado su punto de Renombre.':'';
  }

  button.addEventListener('click',function(){
    if(!isVictory()){
      alert('Primero debes completar la misión con una victoria.');
      return;
    }
    const campaign=read('cruzadaCampaign',null);
    if(!campaign){
      alert('No hay una campaña guardada. Crea o continúa una campaña para registrar el Renombre.');
      return;
    }
    campaign.tavernRenownClaimed=Array.isArray(campaign.tavernRenownClaimed)
      ?campaign.tavernRenownClaimed:[];
    if(campaign.tavernRenownClaimed.includes(missionNumber)){
      refresh();
      return;
    }
    campaign.renown=Number(campaign.renown)||0;
    campaign.renown+=1;
    campaign.tavernRenownClaimed.push(missionNumber);
    localStorage.setItem('cruzadaCampaign',JSON.stringify(campaign));
    status.textContent='El grupo obtiene +1 Renombre.';
    refresh();
  });

  new MutationObserver(refresh).observe(rewards,{attributes:true,attributeFilter:['hidden']});
  refresh();
})();