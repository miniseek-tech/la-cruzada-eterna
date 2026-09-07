from pathlib import Path
p=Path('index.html')
s=p.read_text(encoding='utf-8')
old='<div id="inventory"></div></div><div class="hub-card"><small>☩ PROGRESO DE LA CAMPAÑA</small>'
new='<div id="inventory"></div><button class="hub-main-action" onclick="location.href=\'campamento-equipo.html\'">⚔ GESTIONAR EQUIPO E INVENTARIO</button></div><div class="hub-card"><small>☩ PROGRESO DE LA CAMPAÑA</small>'
if old not in s:
    raise SystemExit('No se encontró el punto de inserción del inventario')
if 'campamento-equipo.html' not in s:
    s=s.replace(old,new,1)
    p.write_text(s,encoding='utf-8')
