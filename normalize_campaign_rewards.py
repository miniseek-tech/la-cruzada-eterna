from pathlib import Path

def replace_once(path, old, new):
    p=Path(path)
    s=p.read_text(encoding='utf-8')
    if old not in s:
        raise SystemExit(f'No se encontró patrón en {path}: {old[:90]}')
    p.write_text(s.replace(old,new,1),encoding='utf-8')

# Misión III: resolver automáticamente la recompensa de los establos.
replace_once('mision3.html',
"if(c){state.campaignBefore={gold:c.gold||0,missionsWon:c.missionsWon||0,completed:[...(c.completed||[])],mission:c.mission,heroes:(c.heroes||[]).map(h=>({...h})),inventory:[...(c.inventory||[])]};c.missionsWon=(c.missionsWon||0)+1;c.completed=Array.from(new Set([...(c.completed||[]),3]));c.mission=4;if(state.stables){rewards.push('Establos registrados: tira 1D6 × 10 coronas y obtienes una antorcha')}if(state.explorer){c.gold=(c.gold||0)+20;rewards.push('+20 coronas por revelar los 5 marcadores')}if(state.bless)rewards.push('Estatua bendecida: +1 Liderazgo durante esta misión');localStorage.setItem('cruzadaCampaign',JSON.stringify(c))}",
"if(c){state.campaignBefore={gold:c.gold||0,missionsWon:c.missionsWon||0,completed:[...(c.completed||[])],mission:c.mission,heroes:(c.heroes||[]).map(h=>({...h})),inventory:[...(c.inventory||[])],pendingD66:c.pendingD66||0};c.inventory=c.inventory||[];c.missionsWon=(c.missionsWon||0)+1;c.completed=Array.from(new Set([...(c.completed||[]),3]));c.mission=4;if(state.stables){const stableGold=(Math.floor(Math.random()*6)+1)*10;c.gold=(c.gold||0)+stableGold;c.inventory.push('Antorcha');rewards.push('Establos registrados: +'+stableGold+' coronas y Antorcha añadida al inventario')}if(state.explorer){c.gold=(c.gold||0)+20;rewards.push('+20 coronas por revelar los 5 marcadores')}if(state.bless)rewards.push('Estatua bendecida: +1 Liderazgo durante esta misión');localStorage.setItem('cruzadaCampaign',JSON.stringify(c))}")

# Misión IV: registrar automáticamente las 4 tiradas D66 pendientes.
replace_once('mision4.html',
"state.campaignBefore={gold:c.gold||0,missionsWon:c.missionsWon||0,completed:[...(c.completed||[])],mission:c.mission,heroes:(c.heroes||[]).map(h=>({...h})),inventory:[...(c.inventory||[])]};c.gold=(c.gold||0)+120;c.missionsWon=(c.missionsWon||0)+1;c.completed=Array.from(new Set([...(c.completed||[]),4]));c.mission=5;c.inventory=c.inventory||[];",
"state.campaignBefore={gold:c.gold||0,missionsWon:c.missionsWon||0,completed:[...(c.completed||[])],mission:c.mission,heroes:(c.heroes||[]).map(h=>({...h})),inventory:[...(c.inventory||[])],pendingD66:c.pendingD66||0};c.gold=(c.gold||0)+120;c.pendingD66=(c.pendingD66||0)+4;c.missionsWon=(c.missionsWon||0)+1;c.completed=Array.from(new Set([...(c.completed||[]),4]));c.mission=5;c.inventory=c.inventory||[];")
replace_once('mision4.html',
"state.rewards=['+30 coronas por héroe (+120 al grupo)','1 tirada D66 por héroe','Sin experiencia'];",
"state.rewards=['+30 coronas por héroe (+120 al grupo)','4 tiradas D66 añadidas a Recompensas pendientes','Sin experiencia'];")

# Misión V: aplicar coronas, D66 y objetos de victoria una única vez.
replace_once('mision5.html',
"if(!state.campaignRewardApplied){c.missionsWon=(c.missionsWon||0)+1;state.campaignRewardApplied=true;save()}c.campaignComplete=true;localStorage.setItem(CAMP,JSON.stringify(c));showResult()",
"if(!state.campaignRewardApplied){c.gold=Number(c.gold)||0;c.inventory=Array.isArray(c.inventory)?c.inventory:[];c.pendingD66=Number(c.pendingD66)||0;c.gold+=200;c.pendingD66+=8;let summary=['+200 coronas (50 por héroe)','+8 tiradas D66 pendientes (4 de victoria + 4 por destruir el Cáliz)'];if(state.noneDown){c.gold+=100;summary.push('+100 coronas: ningún héroe derrotado')}if(state.allBless){const treasure=((Math.floor(Math.random()*6)+1)+(Math.floor(Math.random()*6)+1))*20;c.gold+=treasure;c.inventory.push('Objeto mágico aleatorio (recompensa final)');summary.push('+'+treasure+' coronas por todas las bendiciones','Objeto mágico aleatorio añadido al inventario')}if(state.searchBody){const bodyGold=((Math.floor(Math.random()*6)+1)+(Math.floor(Math.random()*6)+1)+(Math.floor(Math.random()*6)+1))*10;c.gold+=bodyGold;if(!c.inventory.includes('Espada Carmesí de Varkhos'))c.inventory.push('Espada Carmesí de Varkhos');if(!c.inventory.includes('Anillo nobiliario de Varkhos'))c.inventory.push('Anillo nobiliario de Varkhos');summary.push('+'+bodyGold+' coronas del cuerpo de Varkhos','Espada Carmesí de Varkhos y Anillo nobiliario añadidos al inventario')}c.missionsWon=(c.missionsWon||0)+1;state.rewardSummary=summary;state.campaignRewardApplied=true;save()}c.campaignComplete=true;localStorage.setItem(CAMP,JSON.stringify(c));showResult()")
replace_once('mision5.html',
"box.innerHTML='<h3 class=\"victory\">✦ VICTORIA</h3><p>Varkhos ha sido destruido y el Cáliz de Sangre Negra ha sido reducido a fragmentos.</p>';",
"box.innerHTML='<h3 class=\"victory\">✦ VICTORIA</h3><p>Varkhos ha sido destruido y el Cáliz de Sangre Negra ha sido reducido a fragmentos.</p>'+((state.rewardSummary||[]).map(x=>'<p>✦ '+x+'</p>').join(''));"
)

# Inventario: mostrar recompensas D66 pendientes de resolver.
replace_once('campamento-equipo.html',
"<div class=\"panel\"><div class=\"gold\">Coronas de la compañía: <b id=\"gold\">0</b></div><p><button onclick=\"location.href='equipo.html'\">CONSULTAR CATÁLOGO DE EQUIPO</button></p></div>",
"<div class=\"panel\"><div class=\"gold\">Coronas de la compañía: <b id=\"gold\">0</b></div><div class=\"gold\">Tiradas D66 pendientes: <b id=\"pendingD66\">0</b></div><p class=\"note\">Las tiradas D66 concedidas por las misiones quedan registradas aquí hasta que las resolváis con vuestra tabla de botín.</p><p><button onclick=\"location.href='equipo.html'\">CONSULTAR CATÁLOGO DE EQUIPO</button></p></div>")
replace_once('campamento-equipo.html',
"campaign.gold=Number(campaign.gold)||0;save();render();loadArmoryCatalog()",
"campaign.gold=Number(campaign.gold)||0;campaign.pendingD66=Number(campaign.pendingD66)||0;save();render();loadArmoryCatalog()")
replace_once('campamento-equipo.html',
"function render(){document.getElementById('gold').textContent=campaign.gold||0;",
"function render(){document.getElementById('gold').textContent=campaign.gold||0;document.getElementById('pendingD66').textContent=campaign.pendingD66||0;")
