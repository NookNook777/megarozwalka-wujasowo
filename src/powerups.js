'use strict';
/* Znajdźki czasowe: Petardy z Bazaru, Kapsle od Oranżady, Chomik Tuptuś, Kawa z Ekspresu, Nalewka Dziadka, Łódzkie Pierogi */
const FXDUR={petardy:720,kapsle:720,tuptus:900,kawa:600,nalewka:300,pierogi:900};
function fxOn(k){const g=G_;return !!(g.fx&&g.fx[k]>0);}
function fxStart(k){const g=G_;g.fx=g.fx||{};g.fx[k]=FXDUR[k];
  if(k==='pierogi')g.pierN=3;
  if(k==='tuptus'&&!g.tup)g.tup={x:g.P.x-30*g.P.face,y:g.P.y,cd:30,hop:0,face:g.P.face};
  if(k==='nalewka'){beep(300,120,.4,.06,'triangle');}}
function fxTick(g){if(!g.fx)return;for(const k in g.fx)if(g.fx[k]>0){g.fx[k]--;if(g.fx[k]===0){if(k==='tuptus')g.tup=null;if(k==='pierogi')g.pierN=0;}}
  if(g.tup)tuptusAI(g);}
/* PETARDY: pocisk po trafieniu (albo uderzeniu w ziemię) robi mały wybuch, który rani wrogów obok */
function petarda(x,y,dmg){const g=G_,R=30;g.parts.push(...Array.from({length:8},()=>({x,y,vx:(Math.random()-.5)*3,vy:(Math.random()-.5)*3-1,life:12+Math.random()*8,c:['#fff','#ffd040','#ff7a2a','#e0401e'][Math.floor(Math.random()*4)],s:2})));
  if((g.t&3)===0)noise(.08,.12,2200,300);
  for(const e of g.en){if(e.dead||!e.active)continue;const T=ET[e.k];if(Math.abs(e.x-x)<R+T.w/2&&Math.abs((e.y-T.h/2)-y)<R+T.h/2)hitEnemy(e,dmg*.5);}
  for(const br of g.barrels){if(br.dead)continue;if(Math.abs(br.x-x)<R+14&&Math.abs(br.y-20-y)<R+20){br.hp-=dmg*.5;br.flash=4;if(br.hp<=0){br.dead=true;boom(br.x,br.y-18,2);S.boom();addUlt(8);dropCoins(br.x,br.y-20,3);}}}}
/* PIEROGI: trzy pierogi krążą wokół bohatera, każdy łapie jeden wrogi pocisk */
function pierogCatch(e){const g=G_;if(!fxOn('pierogi')||!(g.pierN>0))return false;g.pierN--;e.dead=1;
  for(let i=0;i<10;i++)g.parts.push({x:e.x,y:e.y,vx:(Math.random()-.5)*3,vy:(Math.random()-.5)*3,life:14,c:Math.random()<.5?'#f4dca0':'#fff',s:2});beep(500,900,.08,.06,'square');
  if(g.pierN<=0)g.fx.pierogi=0;return true;}
/* TUPTUŚ: chomik biega przy nodze i pluje ziarnami w najbliższego wroga */
function tuptusAI(g){const t=g.tup,P=g.P;let tx=P.x-26*P.face;if(tx<g.camX+12||tx>g.camX+W-12)tx=P.x+26*P.face;tx=Math.max(g.camX+12,Math.min(g.camX+W-12,tx));/* zawsze w kadrze (przy bossie kamera stoi) */const d=tx-t.x;t.x+=Math.max(-3.4,Math.min(3.4,d*.2));if(Math.abs(d)>2)t.face=d>0?1:-1;
  const gy=onPlatY({x:t.x,y:P.y})??G;t.y+= (Math.min(gy,P.y)-t.y)*.3;t.hop=(t.hop+(Math.abs(d)>2?1:0))%12;
  if(--t.cd>0)return;let best=null,bd=1e9;
  for(const e of g.en){if(e.dead||!e.active||e.x<g.camX+10||e.x>g.camX+W-10)continue;const dd=Math.abs(e.x-t.x);if(dd<300&&dd<bd){bd=dd;best={x:e.x,y:e.y-ET[e.k].h/2};}}
  const bs=g.boss;if(!best&&bs.active&&!bs.dead){const HB=bxr(bs,48,118),hd=bs.st==='whistle'||bs.st==='stagger';best={x:(HB[0]+HB[1])/2,y:(hd?G-160:G-80)+bs.yo};}/* głowa, gdy odsłonięta */
  if(!best){t.cd=10;return;}
  const sx=t.x,sy=t.y-8,dx=best.x-sx,dy=best.y-sy,l=Math.hypot(dx,dy)||1;t.face=dx>0?1:-1;
  g.bullets.push({x:sx,y:sy,vx:dx/l*7,vy:dy/l*7,life:Math.round(SHOT_RANGE/7),dmg:1.2,sc:1,seed:true});t.cd=34;beep(1400,1900,.03,.03,'square');}
function drawFxWorld(g){const P=g.P;
  if(g.tup&&PU.tuptus.complete){const t=g.tup,hy=t.hop<6?-Math.abs(Math.sin(t.hop/6*Math.PI))*3:0;ctx.fillStyle='rgba(0,0,0,.4)';ctx.beginPath();ctx.ellipse(Math.round(t.x),Math.round(t.y)+2,7,2,0,0,6.3);ctx.fill();
    ctx.save();ctx.translate(Math.round(t.x),Math.round(t.y+hy));ctx.scale(t.face,1);ctx.drawImage(PU.tuptus,-8,-16,16,16);ctx.restore();}
  if(fxOn('nalewka')){ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle='rgba(120,60,20,.12)';ctx.fillRect(0,0,W,H);ctx.restore();}}
function drawPierogi(g){const P=g.P;
  if(fxOn('pierogi')&&g.pierN>0&&!P.dead){for(let i=0;i<g.pierN;i++){const a=g.t*.08+i*Math.PI*2/3,x=Math.round(P.x+Math.cos(a)*24),y=Math.round(P.y-36+Math.sin(a)*14);
    ctx.fillStyle='#120c10';ctx.fillRect(x-5,y-3,10,6);ctx.fillRect(x-4,y-4,8,1);ctx.fillStyle='#f4dca0';ctx.fillRect(x-4,y-2,8,4);ctx.fillRect(x-3,y-3,6,1);ctx.fillStyle='#c89650';ctx.fillRect(x-4,y+1,8,1);ctx.fillStyle='#fff';ctx.fillRect(x-2,y-2,2,1);}}
}
