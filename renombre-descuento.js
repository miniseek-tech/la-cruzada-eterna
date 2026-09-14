(function(){
  'use strict';

  function readCampaign(){
    try{return JSON.parse(localStorage.getItem('cruzadaCampaign')||'null')}
    catch(e){return null}
  }

  function discountFor(value){
    return Math.min(10,Math.max(0,Math.floor(Number(value)||0)));
  }

  function discountedPrice(price,discount){
    return Math.max(0,Math.round(Number(price)*(100-discount)/100));
  }

  function addHeroRenown(){
    const data=readCampaign();
    const renown=Math.max(0,Math.floor(Number(data&&data.renown)||0));
    const discount=discountFor(renown);
    document.querySelectorAll('.sheet').forEach(function(sheet){
      if(sheet.querySelector('.hero-renown-badge'))return;
      const badge=document.createElement('div');
      badge.className='hero-renown-badge';
      badge.style.cssText='margin:10px 0 14px;padding:10px 12px;border:1px solid #8a7045;border-radius:8px;background:rgba(70,52,30,.55);color:#e3c474;font-weight:bold';
      badge.innerHTML='🏆 Renombre de la compañía: <strong>'+renown+'</strong> · Descuento en tienda: <strong>'+discount+'%</strong>';
      const title=sheet.querySelector('h2');
      if(title)title.insertAdjacentElement('afterend',badge);
      else sheet.prepend(badge);
    });
  }

  function enhanceArmory(){
    if(typeof campaign==='undefined'||typeof armoryItems==='undefined')return;

    const shopTitle=[].find.call(document.querySelectorAll('h3'),function(x){
      return x.textContent.includes('Tienda de la armería');
    });
    if(shopTitle&&!document.getElementById('renownShopBadge')){
      const badge=document.createElement('p');
      badge.id='renownShopBadge';
      badge.style.cssText='padding:10px 12px;border:1px solid #8a7045;border-radius:8px;background:rgba(70,52,30,.55);color:#e3c474';
      shopTitle.insertAdjacentElement('afterend',badge);
    }

    function refreshBadge(){
      const badge=document.getElementById('renownShopBadge');
      if(!badge||!campaign)return;
      const renown=Math.max(0,Math.floor(Number(campaign.renown)||0));
      badge.innerHTML='🏆 Renombre: <b>'+renown+'</b> · Descuento activo: <b>'+discountFor(renown)+'%</b> <small>(máximo 10%)</small>';
    }

    updatePricePreview=function(){
      const sel=document.getElementById('armorySelect');
      const box=document.getElementById('pricePreview');
      if(!sel||!box||sel.value===''){if(box)box.textContent='';refreshBadge();return}
      const item=armoryItems[Number(sel.value)];
      if(!item)return;
      const discount=discountFor(campaign.renown);
      const finalPrice=discountedPrice(item.price,discount);
      const balance=campaign.gold-finalPrice;
      box.innerHTML='Precio original: <s>'+item.price+' coronas</s> · Descuento por Renombre: <b>'+discount+'%</b><br>Precio final: <b>'+finalPrice+' coronas</b> · Saldo después de comprar: <b>'+balance+'</b>';
      refreshBadge();
    };

    buyFromArmory=function(){
      const sel=document.getElementById('armorySelect');
      if(!sel||sel.value==='')return;
      const item=armoryItems[Number(sel.value)];
      if(!item)return;
      const discount=discountFor(campaign.renown);
      const finalPrice=discountedPrice(item.price,discount);
      if(campaign.gold<finalPrice){
        setShopStatus('No hay suficientes coronas. Necesitas '+finalPrice+' y la compañía tiene '+campaign.gold+'.','error');
        return;
      }
      campaign.gold-=finalPrice;
      campaign.inventory.push(item.name);
      save();
      render();
      sel.value='';
      updatePricePreview();
      setShopStatus(item.name+' comprado por '+finalPrice+' coronas ('+discount+'% de descuento por Renombre) y añadido al inventario.','ok');
    };

    const previousRender=render;
    render=function(){
      previousRender();
      refreshBadge();
    };
    refreshBadge();
    updatePricePreview();
  }

  addHeroRenown();
  enhanceArmory();
})();