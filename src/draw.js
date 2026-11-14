'use strict';
/* Rysowanie: tło, poziom, postacie, HUD, dymki komiksowe */
/* ---------------- draw ---------------- */
function layer(im,f,camX){if(!im.complete||!im.width)return;const w=im.width,o=-Math.floor(((camX*f)%w+w)%w);for(let x=o;x<W;x+=w)ctx.drawImage(im,x,0);}
const sh=(s,x,y,c,al)=>{ctx.textAlign=al||'left';ctx.fillStyle='#000';ctx.fillText(s,x+1,y+1);ctx.fillStyle=c||'#f2ead8';ctx.fillText(s,x,y);};
function drawTitle(t){ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle='#050408';ctx.fillRect(0,0,W,H);
  const span=2700,camX=(t*1.6)%span;layer(IM.far,.25,camX);layer(IM.wall,.6,camX);
  const cx=Math.round(camX);ctx.save();ctx.translate(-cx,0);
  for(const [k,x] of deco){const p=PR[k];if(p.complete&&x>cx-200&&x<cx+W+50&&!isPit(x+p.width/2)){ctx.fillStyle='rgba(0,0,0,.45)';ctx.beginPath();ctx.ellipse(x+p.width/2,G+3,p.width*.5,4,0,0,6.3);ctx.fill();ctx.drawImage(p,x,G-p.height+4);}}
  const t0=Math.floor(cx/32)-1;
  for(let tx=Math.max(0,t0);tx<=t0+22;tx++){const x=tx*32;const top=(tx*7)%4;ctx.drawImage(IM.tiles,top*32,0,32,32,x,G,32,32);ctx.drawImage(IM.tiles,(6+(tx%4))*32,0,32,32,x,G+32,32,32);ctx.drawImage(IM.tiles,(6+((tx+1)%4))*32,0,32,32,x,G+64,32,32);}
  for(const p of plats)if(p.x>cx-150&&p.x<cx+W)ctx.drawImage(IM.plat,p.x,p.y-4,PLW,PLH);
  ctx.restore();
  // golden trio marching (hold the ground: pits are skipped in title view)
  [['b',188,0],['m',262,3],['l',336,5]].forEach(([k,x,off])=>{const im=HS[k].run;if(!im.complete)return;const o=A.heroes[k].meta.run.order,f=o[(Math.floor(t/5)+off)%o.length];
    ctx.fillStyle='rgba(0,0,0,.45)';ctx.beginPath();ctx.ellipse(x,G+2,13,3.5,0,0,6.3);ctx.fill();
    ctx.drawImage(im,f*FW,0,FW,FW,x-(FW/2-4),G-(FW-1),FW,FW);});
  ctx.fillStyle='rgba(5,3,12,.25)';ctx.fillRect(0,0,W,H);}
function draw(){
  if(state==='title'){drawTitle(st);return;}
  const g=G_;ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle='#050408';ctx.fillRect(0,0,W,H);
  if(!g.P)return;
  const sx0=g.shake>0?Math.round(Math.random()*4-2):0;
  ctx.save();ctx.translate(sx0,0);
  layer(IM.far,.25,g.camX);layer(IM.wall,.6,g.camX);plinth(g.camX*.6);
  const cx=Math.round(g.camX);ctx.save();ctx.translate(-cx,0);
  for(const [k,x] of deco){const p=PR[k];if(p.complete&&x>cx-200&&x<cx+W+50&&!isPit(x+p.width/2)){ctx.fillStyle='rgba(0,0,0,.45)';ctx.beginPath();ctx.ellipse(x+p.width/2,G+3,p.width*.5,4,0,0,6.3);ctx.fill();ctx.drawImage(p,x,G-p.height+4);}}
  const t0=Math.floor(cx/32)-1;
  for(let tx=Math.max(0,t0);tx<=t0+22;tx++){const x=tx*32;
    if(isPit(x+16)){drawPitCol(x,tx,g.t,isPit(x-16),isPit(x+48));continue;}
    const l=isPit(x-16),r=isPit(x+48);const top=(tx*7)%4;
    ctx.drawImage(IM.tiles,top*32,0,32,32,x,G,32,32);ctx.drawImage(IM.tiles,(6+(tx%4))*32,0,32,32,x,G+32,32,32);ctx.drawImage(IM.tiles,(6+((tx+1)%4))*32,0,32,32,x,G+64,32,32);
    if(l)pitEdge(x,1);if(r)pitEdge(x+32,-1);}
  for(const p of plats)ctx.drawImage(IM.plat,p.x,p.y-4,PLW,PLH);
  [[CPX,g.cpDone],[CP2,g.cp2Done]].forEach(([X,done])=>{if(X>cx-40&&X<cx+W+40){ctx.fillStyle='#2a2a2a';ctx.fillRect(X,G-70,3,70);ctx.fillStyle=done?'#4ade5a':'#e8203a';const wv=Math.sin(g.t*.15)*2;ctx.beginPath();ctx.moveTo(X+3,G-70);ctx.lineTo(X+26,G-62+wv);ctx.lineTo(X+3,G-54);ctx.fill();}});
  for(const b of g.barrels){if(b.dead)continue;const p=PR.slimebarrel;if(!p.complete)continue;if(b.y===G){ctx.fillStyle='rgba(0,0,0,.45)';ctx.beginPath();ctx.ellipse(b.x,G+3,p.width*.5,4,0,0,6.3);ctx.fill();}ctx.save();if(b.flash&1)ctx.filter='brightness(3)';ctx.drawImage(p,Math.round(b.x-p.width/2),b.y-p.height+4);ctx.restore();}
  for(const e of g.en){if(e.dead||!e.active)continue;const T=ET[e.k];const atk=e.at>=0&&T.atk;const key=atk?T.atk:T.walk,M=A.enemies[key],im=EN[key];if(!im.complete)continue;
    let f;if(atk)f=Math.min(3,Math.floor(e.at/6));else if(e.k==='barrel')f=e.ground?(e.cd<12?1:0):(e.vy<0?3:5);else f=Math.floor(e.t/(e.k==='rat'?3:6))%M.n;
    ctx.save();ctx.translate(Math.round(e.x),Math.round(e.y));ctx.scale(-e.face,1);if(e.flash&1)ctx.filter='brightness(3)';ctx.drawImage(im,f*M.fw,0,M.fw,M.fh,-M.fw/2,-M.fh+1,M.fw,M.fh);ctx.restore();}
  const bs=g.boss;if(!bs.dead||bs.t<170){let an,f;const BAk=A.bossA;
    if(bs.dead){an='die';f=Math.min(7,Math.floor(bs.t/9));}
    else if(!bs.active||g.banner>0){an='walk';f=0;}
    else if(bs.st==='walk'){an='walk';f=Math.floor(bs.stT/7)%8;}
    else if(bs.st==='shoot'||bs.st==='lob'){an='shoot';const ph=bs.st==='shoot'?bs.stT%26:bs.stT;f=Math.min(3,Math.max(0,Math.floor((ph-4)/5)));}
    else if(bs.st==='stagger'){an='whistle';f=Math.floor(bs.stT/4)%6;}
    else if(bs.st==='leap'){an='walk';f=bs.stT<30?0:4;}
    else{an='whistle';f=Math.floor(bs.stT/6)%6;}
    const M=BAk[an],im=BA[an];ctx.save();if(bs.flash&1)ctx.filter='brightness(2.5)';if(bs.dead&&bs.t>130)ctx.globalAlpha=Math.max(0,1-(bs.t-130)/40);
    if(im.complete){const jx=bs.st==='whistle'&&!bs.dead?Math.round(Math.random()*2-1):0;ctx.drawImage(im,f*192,0,192,192,Math.round(bs.x+M.ox+jx),Math.round(G-167+M.oy+bs.yo),192,192);}
    ctx.restore();
    if(!bs.dead&&bs.active){drawArm(bs,false,g.t);drawArm(bs,true,g.t);}
    if(bs.talk&&!bs.dead){const pop=Math.min(1,(150-bs.talk.t)/6),bx=Math.round(bs.x+60-cx),by=Math.round(G-200+bs.yo);ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.translate(bx,by);ctx.scale(pop,pop);ctx.translate(-bx,-by);bubble(bs.talk.txt,bx,by,'spike','#ff5ad0');ctx.restore();}
    if((bs.st==='whistle'||bs.st==='stagger')&&!bs.dead&&!bs.talk&&(g.t>>3)&1){ctx.font='8px "Press Start 2P",monospace';sh('▼ GŁOWA!',bs.x+86,G-212,'#ffd040','center');}}
  const coin=PU.zlotowka;for(const c of g.coinsL){if(c.got)continue;ctx.drawImage(coin,Math.round(c.x-8),Math.round(c.y-8));}
  for(const it of g.items){const p=PU[it.k];ctx.drawImage(p,Math.round(it.x-12),Math.round(it.y-24+Math.sin(g.t*.1)*1.5));}
  for(const c of g.capsA){const p=PU.kapsula;ctx.drawImage(p,Math.round(c.x-20),Math.round(c.y-12));}
  if(g.gren&&UP.gr.complete){ctx.save();ctx.translate(Math.round(g.gren.x),Math.round(g.gren.y));ctx.rotate(g.gren.t*.4);ctx.drawImage(UP.gr,-8,-8);ctx.restore();
    if((g.t>>1)&1){ctx.fillStyle='rgba(255,255,200,.5)';ctx.fillRect(Math.round(g.gren.x)-10,Math.round(g.gren.y)-1,20,2);ctx.fillRect(Math.round(g.gren.x)-1,Math.round(g.gren.y)-10,2,20);}}
  // player
  const P=g.P;{const gy=onPlatY(P);if(gy!==null){const hgt=Math.max(0,gy-P.y);const r=Math.max(5,14-hgt*.08);ctx.fillStyle=`rgba(0,0,0,${Math.max(.12,.45-hgt*.004)})`;ctx.beginPath();ctx.ellipse(Math.round(P.x),gy+2,r,3.5,0,0,6.3);ctx.fill();}}const inv=P.inv>0&&P.hitT<=0&&(g.t>>2)&1;const ghost=g.ultT>0&&g.hero==='m';
  if(P.dead||(state==='over'&&P.deathT!==undefined)){const im=HS[g.hero].die,fw=128,fr=Math.min(7,Math.floor((P.deathT||0)/8));if(im.complete){ctx.save();ctx.translate(Math.round(P.x),Math.round(P.y));ctx.scale(P.face,1);ctx.drawImage(im,fr*fw,0,fw,96,-(fw/2-4),-95,fw,96);ctx.restore();}
    const dt=P.deathT||0;if(dt>44)skullBubble(Math.round(P.x-P.face*20),Math.round(P.y-30),Math.min(1,(dt-44)/6),g.t);}
  else if(P.taunt>0&&state==='play'&&!inv)drawTaunt(g,P);
  else if(state!=='over'&&state!=='win'&&!inv&&state!=='ultcut'){const im=HS[g.hero][P.anim];if(im.complete){const rc=(P.shotT>8&&P.anim!=='shoot')?-1:0;ctx.save();ctx.translate(Math.round(P.x),Math.round(P.y));ctx.scale(P.face,1);
    if(ghost)ctx.globalAlpha=.4;if(g.ultT>0&&g.hero==='l'&&(g.t>>2)&1)ctx.filter='brightness(1.5) saturate(1.6)';
    if(P.hitT>0&&(P.hitT>>1)&1)ctx.filter='brightness(1.8) sepia(1) hue-rotate(-30deg) saturate(4)';ctx.drawImage(im,P.fr*FW,0,FW,FW,-(FW/2-4)+rc,-(FW-1),FW,FW);ctx.restore();}}
  if(g.barrier>0&&(g.barrier>120||(g.t>>2)&1)){for(let i=0;i<14;i++){const a=i/14*6.28+g.t*.08;ctx.fillStyle=i%2?'#5af0ff':'#fff';ctx.fillRect(Math.round(P.x+Math.cos(a)*26)-1,Math.round(P.y-34+Math.sin(a)*38)-1,3,3);}}
  if(P.flashT>0){P.flashT--;const m=muzzle();ctx.fillStyle='#fff6b0';ctx.fillRect(Math.round(m.x)-3,Math.round(m.y)-1,6,3);ctx.fillRect(Math.round(m.x)-1,Math.round(m.y)-3,3,6);}
  const bi=BUL[g.hero];for(const b of g.bullets){ctx.save();ctx.translate(Math.round(b.x),Math.round(b.y));ctx.rotate(Math.atan2(b.vy,b.vx));ctx.scale(b.sc,b.sc);if(b.pierce){ctx.fillStyle='rgba(255,140,40,.35)';ctx.fillRect(-bi.width-10,-2,bi.width+8,4);ctx.fillStyle='rgba(255,230,120,.6)';ctx.fillRect(-bi.width-2,-1,bi.width,2);}ctx.drawImage(bi,-bi.width+6,-bi.height/2);ctx.restore();}
  if(g.hero==='l'&&g.ultT>0)drawBeam(g,g.P);
  for(const e of g.eb){if(e.k==='wave'){const h=14+Math.sin(g.t*.5)*3;ctx.fillStyle='rgba(255,140,210,.8)';ctx.beginPath();ctx.moveTo(e.x-10,G);ctx.quadraticCurveTo(e.x,G-h*2,e.x+10,G);ctx.fill();ctx.fillStyle='#fff';ctx.fillRect(Math.round(e.x)-2,G-h,4,4);continue;}
    if(e.k==='bag'){if(UP.teabag.complete){ctx.save();ctx.translate(Math.round(e.x),Math.round(e.y));ctx.rotate(e.rot);ctx.drawImage(UP.teabag,-8,-8);ctx.restore();}continue;}
    if(e.k==='slime'){ctx.fillStyle='#1e7a18';ctx.beginPath();ctx.arc(Math.round(e.x),Math.round(e.y),e.r+1,0,6.3);ctx.fill();ctx.fillStyle='#9aff5a';ctx.beginPath();ctx.arc(Math.round(e.x),Math.round(e.y),e.r,0,6.3);ctx.fill();ctx.fillStyle='#e8ffc0';ctx.fillRect(Math.round(e.x)-2,Math.round(e.y)-3,2,2);}
    else if(e.k==='tea'){ctx.fillStyle='#ff6ab8';ctx.beginPath();ctx.arc(Math.round(e.x),Math.round(e.y),e.r,0,6.3);ctx.fill();ctx.fillStyle='#ffd0ec';ctx.fillRect(Math.round(e.x)-3,Math.round(e.y)-4,3,3);}
}
  if(g.puffs)for(const q of g.puffs){const r=3+q.t*1.3,al=1-q.t/14;const c1=q.k==='slime'?'154,255,90':'255,106,184',c2=q.k==='slime'?'216,255,144':'255,224,240';
    ctx.fillStyle=`rgba(${c2},${al*.9})`;ctx.beginPath();ctx.ellipse(Math.round(q.x),Math.round(q.y-r*.45),r*.55,r*.45,0,0,6.3);ctx.fill();
    ctx.strokeStyle=`rgba(${c1},${al})`;ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(Math.round(q.x),Math.round(q.y-r*.4),r,r*.6,0,Math.PI,2*Math.PI);ctx.stroke();
    if(q.t<4){ctx.fillStyle='#fff';ctx.fillRect(Math.round(q.x)-1,Math.round(q.y)-5,3,3);}}
  for(const p of g.parts){ctx.fillStyle=p.c;ctx.fillRect(Math.round(p.x),Math.round(p.y),p.s,p.s);}
  drawDnum();
  ctx.restore();ctx.restore();
  if(state==='ultcut')drawCut();
  if(g.flash>0){ctx.fillStyle=`rgba(255,255,255,${g.flash/14})`;ctx.fillRect(0,0,W,H);}
  // HUD
  ctx.font='8px "Press Start 2P",monospace';ctx.textBaseline='top';
  const h=g.h;sh(h.name,8,6,h.c);
  ctx.fillStyle='#000';ctx.fillRect(8,20,104,10);const hf=Math.max(0,g.hp)/100;ctx.fillStyle=g.dmgFlash>0&&(g.dmgFlash&2)?'#fff':(hf>.5?'#4ade5a':hf>.25?'#ffd040':'#ff3a5a');ctx.fillRect(10,22,Math.round(100*hf),6);
  ctx.fillStyle='rgba(255,255,255,.25)';ctx.fillRect(10,22,Math.round(100*hf),2);if(g.armor>0){ctx.fillStyle='#8fb0c8';for(let i=0;i<g.armor;i++)ctx.fillRect(10+i*8,31,6,2);}
  for(let i=0;i<g.lives;i++){const x=118+i*11;ctx.fillStyle='#000';ctx.fillRect(x+1,22,9,8);ctx.fillStyle='#ff3a5a';ctx.fillRect(x,21,4,4);ctx.fillRect(x+4,21,4,4);ctx.fillRect(x+1,24,6,3);ctx.fillRect(x+3,27,2,2);}
  if(g.dmgFlash>0)g.dmgFlash--;
  if(PU.zlotowka.complete)ctx.drawImage(PU.zlotowka,8,36);sh('× '+g.coins,28,38,'#ffd040');
  sh('BROŃ',8,56,'#c8c0d8');for(let i=0;i<3;i++){ctx.fillStyle='#000';ctx.fillRect(49+i*9,58,7,9);ctx.fillStyle=i<g.wl?h.c:'#3a3458';ctx.fillRect(48+i*9,57,7,9);}
  let ix=8;const ic=(k)=>{if(PU[k].complete)ctx.drawImage(PU[k],ix,72,16,16);ix+=19;};
  if(g.armor)ic('kamizelka');if(g.barrier)ic('folia');if(g.magnet)ic('magnes');if(g.fast)ic('klapki');
  // ult bar
  sh('ULT',W/2-70,6,'#c8c0d8');ctx.fillStyle='#000';ctx.fillRect(W/2-40,8,120,8);ctx.fillStyle=g.ult>=100&&(g.t>>3)&1?'#fff':h.c;ctx.fillRect(W/2-39,9,Math.round(118*g.ult/100),6);
  if(g.ult>=100)sh('C!',W/2+86,6,'#fff');
  if(bs.active&&!bs.dead){sh('AGENT B.R.S',W-178,6,'#ff8ad0');ctx.fillStyle='#000';ctx.fillRect(W-178,22,170,7);const hpF=Math.max(0,bs.hp/bs.max);bs.chip=bs.chip===undefined?hpF:Math.max(hpF,bs.chip-.002);ctx.fillStyle='#fff';ctx.fillRect(W-177,23,168*bs.chip,5);ctx.fillStyle='#ff4aa0';ctx.fillRect(W-177,23,168*hpF,5);
    const ab=(a,x,lbl)=>{ctx.fillStyle='#000';ctx.fillRect(x,32,80,5);const f=Math.max(0,a.hp/a.max);a.chip=a.chip===undefined?f:Math.max(f,a.chip-.004);if(!a.dead){ctx.fillStyle='#fff';ctx.fillRect(x+1,33,78*a.chip,3);}ctx.fillStyle=a.dead?'#3a3458':'#ffb030';ctx.fillRect(x+1,33,78*f,3);};ab(bs.fa,W-178,'');ab(bs.ba,W-88,'');}
  if(g.msgT>0&&state!=='win'){ctx.font='10px "Press Start 2P",monospace';sh(g.msg,W/2,104,'#ffd040','center');}
  if(state==='pause'){ctx.fillStyle='rgba(0,0,0,.6)';ctx.fillRect(0,0,W,H);ctx.font='16px "Press Start 2P",monospace';sh('PAUZA',W/2,140,'#fff','center');ctx.font='8px "Press Start 2P",monospace';sh('Enter / Esc: wróć do gry',W/2,176,'#c8c0d8','center');}
  if(state==='win')drawVictory(g);
  if(state==='over'){ctx.fillStyle=`rgba(0,0,0,${Math.min(.7,g.t/40)})`;ctx.fillRect(0,0,W,H);ctx.font='16px "Press Start 2P",monospace';sh('GAME OVER',W/2,130,'#ff3a5a','center');
    ctx.font='8px "Press Start 2P",monospace';if(g.t>60&&(g.t>>4)&1){const cp=g.cp2Done?'od bossa':g.cpDone?'od checkpointu':'od początku';sh('Enter: kontynuuj '+cp,W/2,172,'#ffd040','center');sh('Esc: wróć do menu',W/2,188,'#c8c0d8','center');}}
}
function bubble(text,x,y,shape,col){ctx.font='10px "Press Start 2P",monospace';const tw=ctx.measureText(text).width;const w=tw+28,h=34;let bx=Math.round(Math.min(W-w-6,Math.max(6,x-w/2))),by=Math.round(y-h);
  ctx.save();ctx.lineWidth=3;ctx.strokeStyle='#000';ctx.fillStyle='#fff';ctx.beginPath();
  if(shape==='burst'||shape==='spike'){const cx=bx+w/2,cy=by+h/2,n=shape==='burst'?16:22;for(let i=0;i<=n*2;i++){const a=i/(n*2)*6.283,r=(i%2?1:(shape==='burst'?1.18:1.28));ctx.lineTo(cx+Math.cos(a)*(w/2)*r,cy+Math.sin(a)*(h/2+4)*r);}}
  else{const r=12;ctx.moveTo(bx+r,by);ctx.arcTo(bx+w,by,bx+w,by+h,r);ctx.arcTo(bx+w,by+h,bx,by+h,r);ctx.arcTo(bx,by+h,bx,by,r);ctx.arcTo(bx,by,bx+w,by,r);}
  ctx.closePath();ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.moveTo(x-6,by+h-2);ctx.lineTo(x+4,by+h-2);ctx.lineTo(x-4,by+h+12);ctx.closePath();ctx.fill();ctx.stroke();ctx.fillRect(x-5,by+h-5,9,5);
  ctx.translate(bx+w/2,by+h/2);ctx.rotate(-.04);ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=col;ctx.fillText(text,1,2);ctx.fillStyle='#111';ctx.fillText(text,0,1);ctx.restore();ctx.textBaseline='top';}
function drawCut(){const g=G_,c=g.cut,P=g.P,h=g.h;const cx=Math.round(P.x-g.camX),cy=Math.round(P.y-36);
  ctx.fillStyle='rgba(8,4,16,.6)';ctx.fillRect(0,0,W,H);
  // action lines
  ctx.save();ctx.strokeStyle=h.c;ctx.globalAlpha=.55;ctx.lineWidth=2;for(let i=0;i<28;i++){const a=i/28*6.283+(c.t*.02),r1=60+((i*37+c.t*6)%40),r2=r1+90;ctx.beginPath();ctx.moveTo(cx+Math.cos(a)*r1,cy+Math.sin(a)*r1);ctx.lineTo(cx+Math.cos(a)*r2,cy+Math.sin(a)*r2);ctx.stroke();}ctx.restore();
  if(g.hero==='l'){ctx.save();ctx.globalAlpha=.35+.15*Math.sin(c.t*.6);ctx.fillStyle='#ff5ad0';ctx.beginPath();ctx.ellipse(cx,cy,34+(c.t%6),46+(c.t%6),0,0,6.3);ctx.fill();ctx.restore();}
  const pop=Math.min(1,c.t/5);
  if(g.hero==='b'){const im=UP.bthrow,fw=A.ult.bthrow.fw,f=Math.min(7,Math.floor(c.t/5));if(im.complete){ctx.save();ctx.translate(cx,Math.round(P.y));ctx.scale(P.face,1);ctx.drawImage(im,f*fw,0,fw,96,-(fw/2-4),-95,fw,96);ctx.restore();}}
  else{let k=g.hero==='m'?(c.t<30?'m1':'m2'):'l1';const U=A.ult[k],im=UP[k];
  if(im.complete){ctx.save();ctx.translate(cx,Math.round(P.y));ctx.scale(P.face,1);const jx=g.hero==='l'?Math.round(Math.random()*2-1):0;ctx.drawImage(im,-U.ax+jx,-U.h);ctx.restore();}}
  const bx=cx+P.face*6,by=Math.round(P.y-80);
  if(c.t>3){ctx.save();ctx.translate(bx,by);ctx.scale(pop,pop);ctx.translate(-bx,-by);
    if(g.hero==='b')bubble('FLESZ NA MORDĘ!',bx,by,'burst',h.c);
    else if(g.hero==='m')bubble(c.t<30?'No i…':'No i… pyk!',bx,by,'round',h.c);
    else bubble('GIŃCIE PARÓWCZAKI!',bx,by,'spike',h.c);ctx.restore();}}
const SKULL=["..#####..",".#######.","#########","#oo###oo#","#oo###oo#","####o####",".#######.","..#o#o#..","..#####.."];
function skullBubble(x,y,pop,t){const bob=Math.round(Math.sin(t*.12)*2);y+=bob-Math.round((1-pop)*6);
  ctx.save();ctx.translate(x,y);ctx.scale(pop,pop);
  ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(0,-14,17,15,0,0,6.3);ctx.fill();ctx.beginPath();ctx.moveTo(-5,-1);ctx.lineTo(4,-1);ctx.lineTo(-1,10);ctx.closePath();ctx.fill();
  ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(0,-14,15,13,0,0,6.3);ctx.fill();ctx.beginPath();ctx.moveTo(-3,-2);ctx.lineTo(2,-2);ctx.lineTo(-1,6);ctx.closePath();ctx.fill();
  for(let r=0;r<9;r++)for(let c=0;c<9;c++){const v=SKULL[r][c];if(v==='.')continue;ctx.fillStyle=v==='#'?'#e8e0d0':'#111';ctx.fillRect(-9+c*2,-23+r*2,2,2);}
  // skull outline
  ctx.fillStyle='#111';for(let r=0;r<9;r++)for(let c=0;c<9;c++){if(SKULL[r][c]==='.')continue;[[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy])=>{const rr=r+dy,cc=c+dx;if(rr<0||rr>8||cc<0||cc>8||SKULL[rr][cc]==='.')ctx.fillRect(-9+cc*2,-23+rr*2,2,2);});}
  ctx.restore();}

/* dziura ze ślimem: ciemna przepaść, zielona poświata, falujący ślim z bąblami, kapanie z krawędzi */
let PITGR=null;
function drawPitCol(x,tx,t,lp,rp){
  if(!PITGR){PITGR=ctx.createLinearGradient(0,G,0,H);PITGR.addColorStop(0,'#000');PITGR.addColorStop(.55,'#04140a');PITGR.addColorStop(1,'#1d6a16');}
  ctx.fillStyle=PITGR;ctx.fillRect(x,G,32,H-G);
  // ślim na dnie — falująca powierzchnia
  const sy=H-22;
  for(let i=0;i<32;i+=2){const w=Math.round(Math.sin((x+i)*.18+t*.08)*2);ctx.fillStyle='#3cc42a';ctx.fillRect(x+i,sy+w,2,H-sy-w);ctx.fillStyle='#9aff5a';ctx.fillRect(x+i,sy+w,2,2);}
  // bąble
  const ph=(t+tx*37)%90;if(ph<60){const bx=x+8+((tx*13)%16),by=sy-Math.floor(ph/12);ctx.fillStyle='#d8ff90';ctx.fillRect(bx,by,3,3);ctx.fillStyle='#1e7a18';ctx.fillRect(bx+1,by+1,1,1);}
  // kapiący ślim z krawędzi
  if(!lp||!rp){const ex=!lp?x+1:x+29,d=(t+tx*19)%70;ctx.fillStyle='#3cc42a';ctx.fillRect(ex,G+2,2,4);if(d<50){ctx.fillStyle='#9aff5a';ctx.fillRect(ex,G+6+Math.floor(d*d/30),2,3);}}
}

/* czysta pionowa krawędź urwiska przy dziurze (zamiast klinowatego kafla) */
function pitEdge(ex,dir){const o=dir>0?0:-1;
  ctx.fillStyle='#101014';ctx.fillRect(ex+o*4,G+3,4,H-G);           // cień ściany
  ctx.fillStyle='#55555e';ctx.fillRect(ex+(dir>0?4:-5),G+3,1,H-G);    // światło na krawędzi
  ctx.fillStyle='#8a8a94';ctx.fillRect(ex+(dir>0?0:-5),G,5,2);         // obłamany brzeg płyty
  ctx.fillStyle='#6a6a74';ctx.fillRect(ex+(dir>0?0:-5),G+2,5,1);}

/* cokół: domyka dół ściany tła do linii podłogi (ściana kończy się 6 px nad ziemią, widać to nad dziurami) */
function plinth(ox){const y0=G-12;ctx.fillStyle='#1b241e';ctx.fillRect(0,y0,W,G-y0+1);ctx.fillStyle='#2f3d33';ctx.fillRect(0,y0,W,2);
  ctx.fillStyle='#121915';const o=-Math.floor(ox%40);for(let x=o;x<W;x+=40){ctx.fillRect(x,y0+2,1,G-y0-2);ctx.fillRect(x+20,y0+7,1,G-y0-7);}
  ctx.fillRect(0,y0+7,W,1);}

/* ekran zwycięstwa: unikalna poza bohatera (Badziejek — selfie z fleszem, Marewik — kawka, Łysa — buziak) */
function drawVictory(g){const t=g.t,k=g.hero,M=A.heroes[k].meta.victory,im=HS[k].victory;
  ctx.fillStyle=`rgba(0,0,0,${Math.min(.72,t/40)})`;ctx.fillRect(0,0,W,H);if(t<10)return;
  const a=Math.min(1,(t-10)/20);ctx.globalAlpha=a;
  // reflektor
  const cx=W/2,fy=258;const gr=ctx.createRadialGradient(cx,fy-60,10,cx,fy-60,150);gr.addColorStop(0,'rgba(255,230,160,.22)');gr.addColorStop(1,'rgba(255,230,160,0)');ctx.fillStyle=gr;ctx.fillRect(cx-160,fy-210,320,230);
  ctx.fillStyle='rgba(255,220,140,.18)';ctx.beginPath();ctx.ellipse(cx,fy+2,62,9,0,0,6.3);ctx.fill();ctx.fillStyle='rgba(0,0,0,.5)';ctx.beginPath();ctx.ellipse(cx,fy+1,34,5,0,0,6.3);ctx.fill();
  const S2=2,f=Math.floor(t/8)%M.n,x0=Math.round(cx-M.fw*S2/2),y0=fy-M.fh*S2+2;
  if(im.complete)ctx.drawImage(im,f*M.fw,0,M.fw,M.fh,x0,y0,M.fw*S2,M.fh*S2);
  {const ga=ctx.globalAlpha;drawHeart(M,t,x0,y0,S2,1);ctx.globalAlpha=ga;}
  if(M.flash&&f===M.flash[2]){const fx=x0+M.flash[0]*S2,fy2=y0+M.flash[1]*S2,ph=(t%8);const r=6+ph*3;ctx.fillStyle='rgba(255,255,255,.9)';ctx.beginPath();ctx.arc(fx,fy2,r,0,6.3);ctx.fill();
    ctx.fillStyle='rgba(255,255,255,.75)';ctx.fillRect(fx-r*2.2,fy2-1,r*4.4,3);ctx.fillRect(fx-1,fy2-r*2.2,3,r*4.4);if(ph===0){ctx.fillStyle='rgba(255,255,255,.25)';ctx.fillRect(0,0,W,H);}}
  ctx.font='14px "Press Start 2P",monospace';sh('PIWNICA ZALICZONA!',W/2,58,'#ffd040','center');
  ctx.font='8px "Press Start 2P",monospace';sh(HEROES[k].name+' WYGRYWA!',W/2,80,'#ff8ad0','center');
  sh('Zebrane złotówki: '+g.coins,W/2,290,'#fff','center');if(t>60&&(t>>4)&1)sh('Enter: wróć do menu',W/2,316,'#c8c0d8','center');ctx.globalAlpha=1;}

function drawTaunt(g,P){const k=g.hero,M=A.heroes[k].meta.victory,im=HS[k].victory;if(!im.complete)return;const f=Math.min(M.n-1,Math.floor((TAUNT_T-P.taunt)/8));
  ctx.save();ctx.translate(Math.round(P.x),Math.round(P.y));ctx.scale(P.face,1);const x0=-Math.round(M.fw/2),y0=-M.fh+2;ctx.drawImage(im,f*M.fw,0,M.fw,M.fh,x0,y0,M.fw,M.fh);drawHeart(M,TAUNT_T-P.taunt,x0,y0,1,1);
  if(M.flash&&f===M.flash[2]){const fx=x0+M.flash[0],fy=y0+M.flash[1],r=3+(P.taunt%8)*1.5;ctx.fillStyle='rgba(255,255,255,.9)';ctx.beginPath();ctx.arc(fx,fy,r,0,6.3);ctx.fill();ctx.fillRect(fx-r*2,fy-.5,r*4,1.5);ctx.fillRect(fx-.5,fy-r*2,1.5,r*4);}
  ctx.restore();}

/* serduszko z buziaka Łysej (pixel-art rysowany w kodzie): wylatuje z dłoni w klatce M.heart[2] i odlatuje w górę */
const HEART=['.##.##.','#######','#######','.#####.','..###..','...#...'];
function drawHeart(M,tick,x0,y0,sc,dir){if(!M.heart)return;const L=M.n*8,age=((tick-M.heart[2]*8)%L+L)%L;if(age>=34)return;
  const hx=x0+(M.heart[0]+age*.25*dir)*sc,hy=y0+(M.heart[1]-age*.7)*sc,p=Math.max(1,Math.round(sc*(age<4?.6:1)));ctx.globalAlpha*=age>22?(34-age)/12:1;
  for(let r=0;r<HEART.length;r++)for(let c=0;c<7;c++)if(HEART[r][c]==='#'){ctx.fillStyle=r===0&&c<3?'#ffc0e0':'#ff4a9a';ctx.fillRect(Math.round(hx+(c-3)*p),Math.round(hy+r*p),p,p);}
  ctx.globalAlpha=1;}
