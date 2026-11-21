'use strict';
/* Klawiatura, pad, ekran dotykowy */
/* ---------------- input ---------------- */
const K={},tap={},T={l:0,r:0,u:0,d:0,j:0,f:0,x:0,tj:0,tx:0,tp:0,tv:0};
/* przypisania klawiszy (2 na akcję), zapisywane w przeglądarce; Spacja zawsze skacze, Enter/Esc/P zawsze pauzują */
const BIND_DEF={l:['ArrowLeft','KeyA'],r:['ArrowRight','KeyD'],u:['ArrowUp','KeyW'],d:['ArrowDown','KeyS'],j:['KeyZ','KeyK'],f:['KeyX','KeyJ'],x:['KeyC','KeyL'],v:['KeyV','KeyT']};
const BIND_RES=['Enter','Escape','KeyP','Space'];
let BIND=JSON.parse(JSON.stringify(BIND_DEF));try{const b=JSON.parse(localStorage.getItem('megarozwalka_keys')||'null');if(b)for(const a in BIND_DEF)if(Array.isArray(b[a]))BIND[a]=[b[a][0]||null,b[a][1]||null];}catch(e){}
function saveBind(){try{localStorage.setItem('megarozwalka_keys',JSON.stringify(BIND));}catch(e){}}
const kb=a=>{const b=BIND[a];return !!((b[0]&&K[b[0]])||(b[1]&&K[b[1]]));},kt=a=>{const b=BIND[a];return !!((b[0]&&tap[b[0]])||(b[1]&&tap[b[1]]));};
let REB=null;// {a,slot} gdy czekamy na nowy klawisz
addEventListener('keydown',e=>{if(REB){e.preventDefault();rebindKey(e.code);return;}
  if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code)||(state!=='title'&&Object.values(BIND).some(b=>b.includes(e.code))))e.preventDefault();if(!K[e.code])tap[e.code]=1;K[e.code]=1;au();onKey(e.code);});
addEventListener('keyup',e=>{K[e.code]=0;});
const I={};
function poll(){let gp={};try{for(const g of navigator.getGamepads?navigator.getGamepads():[]){if(!g)continue;const b=i=>g.buttons[i]&&g.buttons[i].pressed;
  gp={l:g.axes[0]<-.4||b(14),r:g.axes[0]>.4||b(15),u:g.axes[1]<-.4||b(12),d:g.axes[1]>.4||b(13),j:b(0),f:b(2)||b(7),x:b(3)||b(1),p:b(9),v:b(4)||b(8)};}}catch(e){}
  const pj=I.j,px=I.x,pp=I.p,pv=I.v;
  I.l=kb('l')||T.l||gp.l;I.r=kb('r')||T.r||gp.r;I.u=kb('u')||T.u||gp.u;I.d=kb('d')||T.d||gp.d;
  I.j=kb('j')||K.Space||T.j||gp.j;I.f=kb('f')||T.f||gp.f;I.x=kb('x')||T.x||gp.x;I.p=K.Enter||K.Escape||K.KeyP||gp.p;I.v=kb('v')||gp.v;
  I.jp=(kt('j')||tap.Space||T.tj||(I.j&&!pj))?1:0;I.xp=(kt('x')||T.tx||(I.x&&!px))?1:0;I.pp=(tap.Enter||tap.Escape||tap.KeyP||T.tp||(I.p&&!pp))?1:0;I.vp=(kt('v')||T.tv||(I.v&&!pv))?1:0;
  for(const k in tap)tap[k]=0;T.tj=T.tx=T.tp=T.tv=0;}
