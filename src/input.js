'use strict';
/* Klawiatura, pad, ekran dotykowy */
/* ---------------- input ---------------- */
const K={},tap={},T={l:0,r:0,u:0,d:0,j:0,f:0,x:0,tj:0,tx:0,tp:0,tv:0};
addEventListener('keydown',e=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code))e.preventDefault();if(!K[e.code])tap[e.code]=1;K[e.code]=1;au();onKey(e.code);});
addEventListener('keyup',e=>{K[e.code]=0;});
const I={};
function poll(){let gp={};try{for(const g of navigator.getGamepads?navigator.getGamepads():[]){if(!g)continue;const b=i=>g.buttons[i]&&g.buttons[i].pressed;
  gp={l:g.axes[0]<-.4||b(14),r:g.axes[0]>.4||b(15),u:g.axes[1]<-.4||b(12),d:g.axes[1]>.4||b(13),j:b(0),f:b(2)||b(7),x:b(3)||b(1),p:b(9),v:b(4)||b(8)};}}catch(e){}
  const pj=I.j,px=I.x,pp=I.p,pv=I.v;
  I.l=K.ArrowLeft||K.KeyA||T.l||gp.l;I.r=K.ArrowRight||K.KeyD||T.r||gp.r;I.u=K.ArrowUp||K.KeyW||T.u||gp.u;I.d=K.ArrowDown||K.KeyS||T.d||gp.d;
  I.j=K.KeyZ||K.KeyK||K.Space||T.j||gp.j;I.f=K.KeyX||K.KeyJ||T.f||gp.f;I.x=K.KeyC||K.KeyL||T.x||gp.x;I.p=K.Enter||K.Escape||K.KeyP||gp.p;I.v=K.KeyV||K.KeyT||gp.v;
  I.jp=(tap.KeyZ||tap.KeyK||tap.Space||T.tj||(I.j&&!pj))?1:0;I.xp=(tap.KeyC||tap.KeyL||T.tx||(I.x&&!px))?1:0;I.pp=(tap.Enter||tap.Escape||tap.KeyP||T.tp||(I.p&&!pp))?1:0;I.vp=(tap.KeyV||tap.KeyT||T.tv||(I.v&&!pv))?1:0;
  for(const k in tap)tap[k]=0;T.tj=T.tx=T.tp=T.tv=0;}
