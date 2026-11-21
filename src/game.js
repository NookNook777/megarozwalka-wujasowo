'use strict';
/* Poziom (Piwnica), fizyka, gracz, wrogowie, główna pętla update() */
/* ---------------- level ---------------- */
const LEN=7500,ARENA=LEN-W,CPX=3700,CP2=ARENA-80;
const pits=[[900,1000],[1690,1850],[2620,2720],[3300,3410],[4300,4420],[5050,5230],[6050,6150]];
const isPit=x=>pits.some(p=>x>=p[0]&&x<p[1]);
const plats=[{x:560,y:200},{x:1705,y:214},{x:2240,y:196},{x:2430,y:140},{x:2610,y:206},{x:3290,y:206},{x:3900,y:200},{x:4180,y:196},{x:4330,y:150},{x:4480,y:204},{x:5070,y:214},{x:5200,y:170},{x:5600,y:196},{x:5790,y:146},{x:5980,y:200},{x:6500,y:196},{x:LEN-640+24,y:224},{x:LEN-640+168,y:176}];
const PLW=127,PLH=22;
/* dekoracje Farmy (podgląd): rozkładane tak, żeby nic na siebie nie nachodziło —
   omijają dziury, beczki, checkpointy, niskie platformy (dla wysokich rekwizytów) i siebie nawzajem */
const DECOF_SZ={strach:[89,84],krasnal:[23,38],labedz:[48,40],wanna:[48,36],ul:[49,48],tv:[36,40],buda:[58,48],rower:[72,44],wiadro:[28,32],gasior:[33,40],butla:[17,40],placek1:[31,15],placek2:[41,19],placek3:[28,21]};
function buildDeco(SZ,K){
  const BAR=[[640,G],[1280,G],[1540,G],[2010,G],[2920,G],[3180,G],[3560,G],[4060,G],[4560,G],[4760,G],[5400,G],[6300,G],[6700,G]];
  const free=(k,x)=>{const [w,h]=SZ[k],a=x-6,b=x+w+6;
    for(let t=a;t<=b;t+=4)if(isPit(t))return false;
    for(const [bx] of BAR)if(b>bx-22&&a<bx+22)return false;
    for(const cx of [CPX,CP2])if(b>cx-12&&a<cx+34)return false;
    for(const p of plats)if(G-h<p.y+24&&b>p.x-6&&a<p.x+PLW+6)return false;
    return true;};
  const o=[];let x=60,i=0,tries=0;while(x<ARENA-40&&tries<5000){const k=K[i%K.length];tries++;
    if(free(k,x)){o.push([k,x]);x+=SZ[k][0]+60+((i*97)%110);i++;}else x+=8;}
  return o;}
const decoF=buildDeco(DECOF_SZ,['strach','placek2','krasnal','labedz','placek1','wanna','ul','placek3','tv','buda','rower','placek2','wiadro','gasior','placek1','butla','krasnal','labedz','placek3','strach','wanna','buda','placek2','rower','ul','tv','placek1','wiadro']);
/* dekoracje New Łódź City (podgląd) */
const DECOL_SZ={robot:[50,30],automat:[52,64],auto:[69,50],holo:[39,48],smieci:[68,40],hulajnoga:[40,44],serwery:[67,50],wozek:[68,54],wlaz:[39,17],strzalka:[59,26],kosz:[34,46]};
const decoL=buildDeco(DECOL_SZ,['automat','wlaz','robot','auto','kosz','holo','smieci','strzalka','hulajnoga','serwery','wozek','wlaz','kosz','robot','automat','smieci','holo','auto','strzalka','hulajnoga','serwery','wozek']);
const deco=[['car',3480],['tires',3640],['pallet',3980],['shelf',4120],['cabinet',4620],['can',4700],['rubble',4880],['car',5320],['shelf',5480],['tires',5900],['cabinet',6240],['rubble',6400],['pallet',6620],['can',6780],['car',40],['tires',300],['shelf',420],['pallet',760],['cabinet',1120],['can',1200],['rubble',1430],['shelf',1980],['tires',2100],['car',2850],['cabinet',3060]];
let G_={};
function startGame(k){beamStop();musPlay('piwnica');
  state='play';const h=HEROES[k];
  G_={hero:k,h,t:0,lives:3,hp:100,dmgFlash:0,cpDone:false,cp2Done:false,coins:0,wl:1,armor:0,barrier:0,ult:0,ultT:0,magnet:false,fast:false,msg:'',msgT:0,flash:0,shake:0,banner:0,
    P:{x:120,y:G,vx:0,vy:0,face:1,ground:true,coyote:0,buf:0,cd:0,anim:'idle',fr:0,fi:0,ft:0,inv:60,shotT:0,flashT:0,hitT:0,kb:0,dead:false},
    bullets:[],eb:[],parts:[],items:[],camX:0,
    barrels:[[640,G],[1280,G],[1540,G],[2010,G],[2470,140],[2920,G],[3180,G],[3560,G],[3950,200],[4060,G],[4560,G],[4760,G],[5400,G],[5820,146],[6300,G],[6700,G]].map(([x,y])=>({x,y,hp:3,dead:false,flash:0})),
    coinsL:[],caps:[{x:700,spawned:false},{x:1600,spawned:false},{x:2450,spawned:false},{x:3800,spawned:false},{x:4900,spawned:false},{x:6350,spawned:false,k:'dopalka'}],capsA:[],
    en:SPAWN.map(([k,x,y])=>({k,x,y:y||G,vx:0,vy:0,hp:ET[k].hp,face:-1,active:false,t:0,cd:60+Math.random()*60,at:-1,flash:0,dead:false,ground:true})),
    boss:{x:LEN-270,hp:160,max:160,yo:0,vy:0,phase:1,talk:null,flash:0,dead:false,t:0,cd:120,active:false,st:'walk',stT:0,dir:-1,step:0,at:0,fa:{hp:45,max:45,dead:false,flash:0,cd:40,t:-1,vul:0},ba:{hp:45,max:45,dead:false,flash:0,cd:95,t:-1,vul:0}}};
  const C=G_.coinsL;const row=(x0,y,n)=>{for(let i=0;i<n;i++)C.push({x:x0+i*22,y,got:false});};
  row(3500,G-30,5);row(3905,170,5);row(4335,120,5);row(5205,140,5);row(5795,116,5);row(6505,166,5);row(6800,G-30,6);
  row(260,G-30,5);row(580,170,5);row(1050,G-60,6);row(1725,184,5);row(2255,166,5);row(2445,110,5);row(2760,G-30,6);row(3000,G-70,5);
  msgShow(h.name+(FARMA?' NA FARMIE BADZIEJA!':LODZ?' W NEW ŁÓDŹ CITY!':' W PIWNICY MAREWIKA!'),120);
}
function continueGame(){const o=G_;const k=o.hero,c1=o.cpDone,c2=o.cp2Done,coins=o.coins,ds=o.dialogSeen;startGame(k);const g=G_;g.coins=coins;g.dialogSeen=ds;
  const x=c2?CP2+30:c1?CPX+30:120;g.P.x=x;g.camX=Math.max(0,x-256);g.cpDone=c1||c2;g.cp2Done=c2;
  g.en=g.en.filter(e=>e.x>x+80);g.barrels=g.barrels.filter(b=>b.x>x);for(const c of g.caps)if(c.x<x)c.spawned=true;g.coinsL=g.coinsL.filter(c=>c.x>x);
  msgShow(c2?'DRUGIE PODEJŚCIE DO B.R.S!':'WRACAMY DO AKCJI!',100);}
function msgShow(m,t,sub){G_.msg=m;G_.msg2=sub||'';G_.msgT=t||90;}
const META=k=>A.heroes[G_.hero].meta[k];
function groundAt(x,py,y,drop){if(!isPit(x)&&py<=G+.5&&y>=G)return G;if(!drop)for(const p of plats){if(x>=p.x+4&&x<=p.x+PLW-4&&py<=p.y+.5&&y>=p.y)return p.y;}return null;}
function onPlatY(P){let best=null;if(!isPit(P.x)&&P.y<=G+1)best=G;for(const p of plats){if(P.x>=p.x+4&&P.x<=p.x+PLW-4&&P.y<=p.y+1&&(best===null||p.y<best))best=p.y;}return best;}
function onPlat(P){return plats.some(p=>P.x>=p.x+4&&P.x<=p.x+PLW-4&&Math.abs(P.y-p.y)<1);}
const DIFF=1;
function hurt(dmg,fromX){const g=G_,P=g.P;dmg=(dmg||15)*DIFF*(G_.hero==='m'?.8:1);if(P.dead||P.inv>0||g.barrier>0||(g.ultT>0&&(g.hero==='m'||g.hero==='l')))return;
  if(g.armor>0){g.armor--;dmg*=.5;}
  g.hp-=dmg;g.dmgFlash=10;S.hurt();g.shake=6;P.inv=42;P.hitT=24;const dir=fromX!==undefined?(P.x<fromX?-1:1):-P.face;P.kb=2.4*dir;
  if(g.hp<=0){g.hp=0;g.lives--;g.shake=12;g.wl=Math.max(1,g.wl-1);P.hitT=0;P.dead=true;P.deathT=0;P.kb=1.8*dir;P.vy=Math.min(P.vy,-2);}}
function killFall(){const g=G_,P=g.P;S.hurt();g.hp-=30*DIFF;g.dmgFlash=10;
  if(g.hp<=0){g.lives--;g.wl=Math.max(1,g.wl-1);if(g.lives<=0){g.hp=0;state='over';g.t=0;return false;}g.hp=100;msgShow('ZOSTAŁO ŻYĆ: '+g.lives,70);}else msgShow('UPS! -30 HP',50);return true;}
function update(){
  poll();const g=G_;if(!g.P)return;g.t++;
  if(state==='pause'){if(I.pp)state='play';return;}
  if(state==='win'||state==='over'){for(const p of g.parts){p.x+=p.vx;p.y+=p.vy;p.life--;}g.parts=g.parts.filter(p=>p.life>0);if(g.boss.dead&&g.boss.t<150){g.boss.t++;if(g.boss.t%6===0)boom(g.boss.x+20+Math.random()*140,G-20-Math.random()*140,2);}return;}
  if(state==='ultcut'){updCut();return;}
  if(state==='dialog'){updDialog();return;}
  if(state!=='play')return;
  if(I.pp){state='pause';return;}
  const P=g.P,h=g.h;
  if(P.dead){P.deathT++;P.vy=Math.min(9,P.vy+GRAV);const py0=P.y;P.x+=P.kb;P.kb*=.92;P.y+=P.vy;if(P.vy>=0){const gy=groundAt(P.x,py0,P.y,false);if(gy!==null){P.y=gy;P.vy=0;}}
    if(P.y>H+60)P.deathT=Math.max(P.deathT,80);
    for(const p of g.parts){p.x+=p.vx;p.y+=p.vy;p.life--;}g.parts=g.parts.filter(p=>p.life>0);
    if(P.deathT>=95){if(g.lives<=0){state='over';g.t=0;return;}P.dead=false;P.inv=130;g.hp=100;P.vx=0;P.vy=0;P.y=Math.min(P.y,G);if(P.y>G||isPit(P.x)){while(isPit(P.x))P.x+=20;P.y=-20;}msgShow('ZOSTAŁO ŻYĆ: '+g.lives,70);}
    return;}
  if(P.hitT>0){P.hitT--;P.x+=P.kb;P.kb*=.85;}
  const beam=g.hero==='l'&&g.ultT>0;
  const mx0=(I.r?1:0)-(I.l?1:0);if(mx0)P.face=mx0;if(I.vp&&P.ground&&!beam&&!P.taunt&&P.hitT<=0)P.taunt=TAUNT_T;if(P.taunt>0&&(mx0||I.jp||I.f||I.xp||P.hitT>0||!P.ground))P.taunt=0;if(P.taunt>0)P.taunt--;
  const mx=(beam||P.taunt>0)?0:mx0;
  P.vx=mx*(g.fast?3.3:2.6);
  if(I.jp&&!beam)P.buf=7;if(P.buf>0)P.buf--;
  if(P.ground)P.coyote=6;else if(P.coyote>0)P.coyote--;
  let drop=false;
  if(P.buf>0&&P.coyote>0){if(I.d&&onPlat(P)){drop=true;P.y+=2;P.ground=false;P.buf=0;P.dropT=10;}else{P.vy=-9.4;P.ground=false;P.coyote=0;P.buf=0;S.jump();}}
  if(P.dropT>0)P.dropT--;
  if(!I.j&&P.vy<-3.5)P.vy=-3.5;
  P.vy=Math.min(9,P.vy+GRAV);
  if(!g.arenaLock&&g.boss.active&&!g.boss.dead&&P.x>ARENA+24)g.arenaLock=true;
  const py=P.y;P.x=Math.max(g.arenaLock&&!g.boss.dead?ARENA+12:g.camX+12,Math.min(LEN-20,P.x+P.vx));P.y+=P.vy;
  if(P.vy>=0){const gy=groundAt(P.x,py,P.y,P.dropT>0);if(gy!==null){P.y=gy;P.vy=0;P.ground=true;}else P.ground=false;}else P.ground=false;
  if(FARMA&&P.vy>0&&isPit(P.x)&&P.y>=H-26&&P.y-P.vy<H-26){(g.spl=g.spl||[]).push({x:P.x,t:0});noise(.35,.3,700,90);}
  if(P.y>H+60){P.x=Math.max(g.camX+80,P.x-160);while(isPit(P.x))P.x+=20;P.y=-20;P.vy=0;if(!killFall())return;P.inv=Math.max(P.inv,120);}
  if(P.inv>0)P.inv--;if(g.barrier>0)g.barrier--;
  // anim
  let an;if(P.hitT>0)an='hit';else if(!P.ground)an='jump';else if(mx)an=I.u?'up':I.d?'down':'run';else an=beam?'shoot':I.u?'up':(I.f||P.shotT>0)?'shoot':'idle';
  const M=META(an);
  if(an!==P.anim){P.anim=an;P.fi=0;P.fr=M.order[0];P.ft=0;}
  const spd={idle:11,run:5,shoot:4,up:5,down:5}[an];
  if(an==='hit'){P.fr=Math.min(3,Math.floor((24-P.hitT)/6));}
  else if(an==='jump'){const v=P.vy;P.fr=v<-4?2:v<-1.5?3:v<1.5?4:v<4?5:6;}else if(an==='up'&&!mx)P.fr=0;
  else if(++P.ft>=spd){P.ft=0;P.fi=(P.fi+1)%M.order.length;P.fr=M.order[P.fi];}
  // fire
  if(P.cd>0)P.cd--;if(P.shotT>0)P.shotT--;
  if(beam)beamTick(g,P);
  else if(I.f&&P.cd<=0&&!P.taunt){fire();P.cd=Math.max(3,Math.round((h.cd-(g.wl>=2&&g.hero==='m'?3:0))*(fxOn('kawa')?.5:1)));P.shotT=11;}
  // ult
  if(g.ultT>0){g.ultT--;if(g.ultT===0&&g.hero==='l')beamStop();}
  if(g.boss.active&&!g.boss.dead)addUlt(.5/60); // powolne ładowanie w trakcie walki z bossem
  if(I.xp&&g.ult>=100&&P.ground){g.ult=0;state='ultcut';g.cut={t:0};P.vx=0;
    if(g.hero==='b'){S.ult();}else if(g.hero==='m'){beep(1200,1600,.08,.05,'sine');}else{spinUp();}}
  // flashbang grenade (Badziejek ult)
  stepGren();
  // bullets
  for(const b of g.bullets){b.x+=b.vx;b.y+=b.vy;b.life--;
    if(b.y>G&&!isPit(b.x)){if(fxOn('kapsle')&&!b.bounced){b.bounced=1;b.y=G-1;b.vy=-Math.abs(b.vy);spark(b.x,G,'#ffb030');}else{b.dead=1;spark(b.x,G,'#ffd860');}}
    for(const br of g.barrels){if(br.dead||(b.hit&&b.hit.has(br))||br.x<g.camX+10||br.x>g.camX+W-14)continue;if(b.x>br.x-16&&b.x<br.x+16&&b.y>br.y-40&&b.y<br.y){br.hp-=b.dmg;br.flash=4;spark(b.x,b.y,'#9aff5a');beep(900,300,.04,.05);
      if(b.pierce){(b.hit=b.hit||new Set()).add(br);}else b.dead=1;
      if(br.hp<=0){br.dead=true;boom(br.x,br.y-18,2);S.boom();addUlt(8);dropCoins(br.x,br.y-20,3);}}}
    for(const e of g.en){if(e.dead||!e.active||(b.hit&&b.hit.has(e))||e.x<g.camX+10||e.x>g.camX+W-14)continue;const T=ET[e.k];if(Math.abs(b.x-e.x)<T.w/2+3&&b.y>e.y-T.h&&b.y<e.y+2){hitEnemy(e,b.dmg*(g.ultT>0&&g.hero==='m'?2:1));spark(b.x,b.y,'#9aff5a');if(g.hero==='m'&&!b.seed)marewikImpact(e,b);if(b.pierce)(b.hit=b.hit||new Set()).add(e);else{b.dead=1;break;}}}
    if(b.dead)continue;
    for(const c of g.capsA){if(c.dead)continue;if(Math.abs(b.x-c.x)<18&&Math.abs(b.y-c.y)<12){b.dead=1;c.dead=true;boom(c.x,c.y,1);S.boom();dropItem(c.x,c.y,c.k);}}
    const bs=g.boss;if(!bs.dead&&bs.active&&bs.x<g.camX+W-20){const mul=(g.ultT>0&&g.hero==='m'?2:1);let ah=armHit(bs,b);if(ah&&b.hit&&b.hit.has(bs[ah]))ah=null;if(ah&&b.seed&&!(bs[ah].t>=0||bs[ah].vul>0))ah=null;/* pestki Tuptusia przelatują przez opancerzone ramię */
      if(ah){hitArm(bs[ah],b.dmg*mul,b.x,b.y,ah==='fa');if(b.pierce)(b.hit=b.hit||new Set()).add(bs[ah]);else b.dead=1;}else if(!(b.hit&&b.hit.has(bs))){const HB=bxr(bs,48,118),BB=bxr(bs,34,160);const head=(bs.st==='whistle'||bs.st==='stagger')&&b.x>HB[0]&&b.x<HB[1]&&b.y>G-200+bs.yo&&b.y<G-118+bs.yo;
      if(head){dmgBoss(b.dmg*mul*3,true,b.x,b.y);spark(b.x,b.y,'#ffe066');spark(b.x,b.y,'#fff');if(b.pierce)(b.hit=b.hit||new Set()).add(bs);else b.dead=1;}
      else if(b.x>BB[0]&&b.x<BB[1]&&b.y>G-200+bs.yo&&b.y<G+bs.yo){dmgBoss(b.dmg*mul*(b.seed?.6:.2),false,b.x,b.y);spark(b.x,b.y,'#ff8ad0');if(b.pierce)(b.hit=b.hit||new Set()).add(bs);else b.dead=1;}}}
    if(!b.dead&&b.y<2&&b.vy<0&&fxOn('kapsle')&&!b.bounced){b.bounced=1;b.vy=Math.abs(b.vy);b.y=2;b.hit=null;spark(b.x,b.y+2,'#ffb030');}/* sufit (górna krawędź ekranu) */
    if(!b.dead&&(b.x<g.camX-2||b.x>g.camX+W+2)&&fxOn('kapsle')&&!b.bounced){b.bounced=1;b.vx=-b.vx;b.x=Math.max(g.camX,Math.min(g.camX+W,b.x));b.hit=null;spark(b.x,b.y,'#ffb030');}
    if(!b.dead&&(b.life<=0||b.x<g.camX-2||b.x>g.camX+W+2||b.y<-30)){b.dead=1;b.off=1;}}
  if(fxOn('petardy'))for(const b of g.bullets)if(b.dead&&!b.off&&!b.seed)petarda(b.x,b.y,b.dmg);
  g.bullets=g.bullets.filter(b=>!b.dead);
  // capsules
  for(const c of g.caps){if(!c.spawned&&g.camX+W>c.x){c.spawned=true;g.capsA.push({x:g.camX+W+20,y:90,by:90,t:0,dead:false,k:c.k});}}
  for(const c of g.capsA){c.t++;c.x-=1.4;c.y=c.by+Math.sin(c.t*.06)*22;if(c.x<g.camX-40)c.dead=true;}g.capsA=g.capsA.filter(c=>!c.dead);
  // items
  for(const it of g.items){it.vy=Math.min(6,it.vy+.25);const yy=it.y+it.vy;const gy=groundAt(it.x,it.y,yy,false);if(gy!==null&&it.vy>0){it.y=gy;it.vy=it.bounce?-2.5:0;it.bounce=false;}else it.y=yy;
    if(it.y>H+40)it.dead=1;
    if(!it.dead&&Math.abs(it.x-P.x)<20&&it.y>P.y-70&&it.y<P.y+8){it.dead=1;collect(it.k);}}
  g.items=g.items.filter(i=>!i.dead);
  // coins
  for(const c of g.coinsL){if(c.got)continue;if(c.vy!==undefined&&!c.rest){c.vy=Math.min(6,c.vy+.25);const yy=c.y+c.vy;const gy=groundAt(c.x,c.y,yy,false);if(gy!==null&&c.vy>0){c.y=gy-6;c.vy=0;c.vx=0;c.rest=1;}else{c.y=yy;c.x+=c.vx||0;}}
    const dx=P.x-c.x,dy=(P.y-34)-c.y,d=Math.hypot(dx,dy);
    if(g.magnet&&d<170){c.x+=dx/d*4;c.y+=dy/d*4;}
    if(Math.abs(dx)<18&&c.y>P.y-72&&c.y<P.y+6){c.got=true;g.coins++;S.coin();}}
  if(!g.cpDone&&P.x>CPX){g.cpDone=true;g.hp=100;S.pick();msgShow('CHECKPOINT! HP ODNOWIONE',90);}
  if(!g.cp2Done&&P.x>CP2){g.cp2Done=true;g.hp=100;S.pick();msgShow('CHECKPOINT PRZED BOSSEM!',90);}
  // enemies
  const slowNow=fxOn('nalewka')&&(g.t&1);
  for(const e of (slowNow?[]:g.en)){if(e.dead)continue;const T=ET[e.k];
    if(!e.active){if(e.x<g.camX+W+30){e.active=true;e.face=P.x<e.x?-1:1;}else continue;}
    e.t++;if(e.flash>0)e.flash--;const dx=P.x-e.x;
    if(e.at<0&&e.k!=='rat')e.face=dx<0?-1:1;
    if(e.k==='rat'){if(e.turnT>0)e.turnT--;if((e.chase||(Math.abs(dx)<160&&Math.abs(P.y-e.y)<40))&&e.ground&&e.turnT<=0&&Math.abs(dx)>24&&Math.sign(dx)!==e.face&&safeHop(e.x,Math.sign(dx),14)){e.face=Math.sign(dx);e.turnT=14;}if(e.ground&&e.turnT<=0&&(isPit(e.x+e.face*14)||e.x+e.face*14>ARENA-12||e.x+e.face*14<16)){e.face*=-1;e.turnT=20;}if(e.ground&&e.cd<=0&&Math.abs(dx)<70&&Math.sign(dx)===e.face&&safeHop(e.x,e.face,90)){e.vy=-3.6;e.vx=3.8*e.face;e.ground=false;e.cd=90;beep(900,1400,.06,.04);}else if(e.ground)e.vx=2.8*e.face;e.cd--;}
    else if(e.k==='robol'||e.k==='kan'){const near=e.k==='robol'?90:150;e.vx=(e.at<0&&Math.abs(dx)>near)?(e.k==='robol'?.45:.35)*e.face:0;if(e.ground&&isPit(e.x+e.vx*10))e.vx=0;
      if(e.k==='robol'&&!e.seen&&e.x<g.camX+W-16&&e.x>g.camX+16){e.seen=true;e.cd=Math.min(e.cd,8);}
      e.cd--;if(e.cd<=0&&e.at<0&&(e.k==='robol'?(e.x<g.camX+W-16&&e.x>g.camX+16):Math.abs(dx)<340)&&e.x<g.camX+W-10){e.at=0;e.cd=e.k==='robol'?90:100;}
      if(e.at>=0){e.at++;const rel=e.k==='robol'?12:10;if(e.at>0&&e.at<rel)e.flash=(e.at&2)?3:0;
        if(e.at===rel){const up=P.y<e.y-40;let sp;
          if(e.k==='robol'){const sx=e.x+e.face*16,sy=e.y-50;if(up){let ax=Math.abs(P.x-sx),ay=(sy-(P.y-35));let ang=Math.min(Math.PI/4,Math.atan2(ay,Math.max(1,ax)));sp={x:sx,y:sy,vx:e.face*3.8*Math.cos(ang),vy:-3.8*Math.sin(ang),g:.02,r:5,dmg:15};}else sp={x:sx,y:sy,vx:e.face*3.4,vy:-1.2,g:.08,r:5,dmg:15};}
          else{const sx=e.x+e.face*40,sy=e.y-42;if(up){const T=56,gg=.2,dx=P.x-sx,dy=(P.y-20)-sy;sp={x:sx,y:sy,vx:dx/T,vy:(dy-.5*gg*T*T)/T,g:gg,r:8,dmg:25};}else sp={x:sx,y:sy,vx:e.face*3.2,vy:-.5,g:.04,r:8,dmg:25};}
          g.eb.push(Object.assign(sp,{k:'slime'}));noise(.15,.15,900,200);}
        if(e.at>=24)e.at=-1;}}
    else if(e.k==='barrel'){if(e.ground){e.vx=0;e.cd--;if(e.cd<=0&&Math.abs(dx)<320&&safeHop(e.x,e.face,70)){e.vy=-6.6;e.vx=e.face*1.5;e.ground=false;e.cd=60;beep(200,500,.08,.05,'triangle');}}}
    e.vy=Math.min(8,e.vy+GRAV);const ey=e.y;e.x+=e.vx;e.y+=e.vy;
    if(e.x>ARENA-12)e.x=ARENA-12;
    if(e.vy>=0){const gy=groundAt(e.x,ey,e.y,false);if(gy!==null){e.y=gy;e.vy=0;e.ground=true;}else e.ground=false;}else e.ground=false;
    if(e.y>H+40){e.dead=true;continue;}
    if(Math.abs(dx)<T.w/2+8&&P.y>e.y-T.h&&P.y-60<e.y)hurt(T.cd,e.x);
    if(e.x<g.camX-120)e.dead=true;}
  // boss
  const bs=g.boss;
  if(!bs.dead&&!bs.active&&P.x>ARENA+40&&P.ground){if(!g.dialogSeen){startDialog();return;}bossStart();}
  if(g.banner>0)g.banner--;
  if(bs.active&&!bs.dead&&g.banner<=0&&!slowNow)bossAI(g,bs,P);
  if(bs.dead&&bs.yo<0){bs.vy=(bs.vy||0)+.5;bs.yo=Math.min(0,bs.yo+bs.vy);if(bs.yo>=0){bs.yo=0;bs.vy=0;}} // pokonany w powietrzu też spada
  if(bs.dead&&bs.t<170){bs.t++;if(bs.t%6===0&&bs.t<110){boom(bs.x+20+Math.random()*140,G-20-Math.random()*140,2);}if(bs.t===170){state='win';g.t=0;}}
  if(bs.flash>0)bs.flash--;
  for(const e of (slowNow?[]:g.eb)){e.vy+=e.g;e.x+=e.vx;e.y+=e.vy;
    if(e.k==='wave'){e.life--;if(e.life<=0||isPit(e.x)||e.x<g.camX-20||e.x>LEN)e.dead=1;if((g.t&1)===0)g.parts.push({x:e.x+(Math.random()-.5)*10,y:G-2,vx:(Math.random()-.5),vy:-Math.random()*2.5,life:14,c:Math.random()<.5?'#ff8ad0':'#fff',s:2});
      if(!e.dead&&Math.abs(e.x-P.x)<12&&P.y>G-22)hurt(e.dmg,e.x);continue;}
    if(e.k==='bag'){e.rot=(e.rot||0)+.2;let landed=e.y>=G&&!isPit(e.x);if(!landed)for(const p of plats){if(e.vy>0&&e.x>=p.x&&e.x<=p.x+PLW&&e.y>=p.y&&e.y-e.vy<p.y){landed=true;e.y=p.y;break;}}
      if(landed){e.dead=1;boom(e.x,e.y-6,2);noise(.3,.3,1600,80);if(Math.hypot(P.x-e.x,(P.y-30)-e.y)<34)hurt(e.dmg,e.x);continue;}}
    if(e.k!=='splash'&&e.k!=='bag'&&e.y>=G&&!isPit(e.x)){e.dead=1;microBoom(e.x,G-2,e.k);}
    if(e.k==='splash'){e.dead=1;}
    if(!e.dead&&Math.abs(e.x-P.x)<e.r+6&&e.y>P.y-62&&e.y<P.y+4){if(pierogCatch(e))continue;hurt(e.dmg||15,e.x);e.dead=1;microBoom(e.x,e.y,e.k);}if(e.y>H+30)e.dead=1;}
  g.eb=g.eb.filter(e=>!e.dead);
  for(const p of g.parts){p.x+=p.vx;p.y+=p.vy;p.vx*=.93;p.vy=p.vy*.93+.05;p.life--;}g.parts=g.parts.filter(p=>p.life>0);updDnum();fxTick(g);
  if(g.puffs){for(const q of g.puffs)q.t++;g.puffs=g.puffs.filter(q=>q.t<14);}
  for(const br of g.barrels)if(br.flash>0)br.flash--;
  const tgt=Math.min(ARENA,P.x-W*.4);g.camX+=(tgt-g.camX)*.12;g.camX=Math.max(0,Math.min(ARENA,g.camX));if(g.arenaLock&&!g.boss.dead)g.camX=ARENA;
  if(bs.active&&!bs.dead){g.camX+=(ARENA-g.camX)*.08;if(Math.abs(ARENA-g.camX)<1)g.camX=ARENA;}
  if(g.msgT>0)g.msgT--;if(g.flash>0)g.flash--;if(g.shake>0)g.shake--;
}
function addUlt(v){if(G_.ultT>0||state==='ultcut')return;G_.ult=Math.min(100,G_.ult+v);}// w trakcie ulta pasek się nie ładuje
function microBoom(x,y,k){const g=G_;const C=k==='slime'?['#9aff5a','#3cc42a','#d8ff90','#1e7a18']:['#ff6ab8','#ffd0ec','#fff','#ff3a90'];
  g.puffs=g.puffs||[];g.puffs.push({x,y,t:0,k});
  for(let i=0;i<10;i++){const a=Math.PI+Math.random()*Math.PI,v=.8+Math.random()*2.2;g.parts.push({x:x+(Math.random()-.5)*6,y:y-1,vx:Math.cos(a)*v,vy:Math.sin(a)*v*1.2,life:10+Math.random()*12,c:C[i%4],s:1+(i%3===0?1:0)});}
  noise(.12,.12,2200,300);}

/* czy skok/rzut wroga nie skończy się w przepaści (próbkowanie co 6 px na całej długości lotu) */
function safeHop(x,dir,dist){for(let d=0;d<=dist;d+=6)if(isPit(x+dir*d)||x+dir*d>ARENA-12)return false;return true;}

/* poza zwycięstwa na żądanie (V/T, LB/Select, przycisk ☺): jedna pętla animacji, przerywana ruchem, skokiem, strzałem lub trafieniem */
const TAUNT_T=40; // ~0,7 s

/* ---------- scenka dialogowa przed walką (styl starych j-rpg) ---------- */
const DIALOG={
 l:[['brs','Fiu fiu! A kto to mnie nawiedził?'],['hero','Wiesz kim jestem. Nie świruj pawiana, Brys.'],['brs','Mam wszystko w kajecie.'],['hero','Zaraz ci ten kajet wsadzę w dupę!'],['brs','Próbuj szczęścia, koleżanko!']],
 b:[['brs','Hihihi-hihi! Ale wyglądasz, kumplu niemyty! xD'],['hero','Ty w sumie też nie lepszy. Ten bolid to chyba od Marewika kupiłeś.'],['brs','Nie wiem, Nuk mnie tu wsadził i kazał chleby wypłacać tym co tu przyjdą.'],['hero','Ugh. To co? Jakieś Frotnite potem, kumplu?'],['brs','Ta, ale najpierw dawaj na środek.']],
 m:[['brs','Kto przyszedł? Cukierek albo psikus!'],['hero','Psi... co? Brys? Co ty w ogóle robisz w mojej piwnicy?'],['brs','A tak se na herbatkę wpadłem. Patrz jaki mam zajebisty czajnik, kumplu.'],['hero','Widzę właśnie. No, to kiedy pijemy?'],['brs','Nie mogę, prowadzę.']]};
function startDialog(){const g=G_;musLoad('boss');state='dialog';g.dlg={i:0,t:0,pan:true};g.boss.face=-1;g.P.vx=0;g.P.anim='idle';g.P.face=1;whistleBlip();}
function whistleBlip(){if(!ac)return;const t=ac.currentTime,o=ac.createOscillator(),gg=ac.createGain();o.type='sine';o.frequency.setValueAtTime(1500,t);o.frequency.linearRampToValueAtTime(2300,t+.12);o.frequency.linearRampToValueAtTime(1600,t+.3);gg.gain.setValueAtTime(.0001,t);gg.gain.linearRampToValueAtTime(.07,t+.03);gg.gain.exponentialRampToValueAtTime(.0001,t+.32);o.connect(gg);gg.connect(OUT());o.start(t);o.stop(t+.35);}
function bossStart(){const g=G_,bs=g.boss;musPlay('boss');bs.active=true;bs.cd=170;g.banner=110;fiuFiu();msgShow('FIU FIU! AGENT BRS NADCHODZI!',120);}
function updDialog(){const g=G_,d=g.dlg,L=DIALOG[g.hero];
  // najpierw kamera dojeżdża tak, żeby obaj byli w kadrze twarzą w twarz
  if(d.pan){g.camX+=(ARENA-g.camX)*.15;if(Math.abs(ARENA-g.camX)<.6){g.camX=ARENA;d.pan=false;}g.P.face=1;return;}
  d.t++;const line=L[d.i][1],shown=Math.floor(d.t*1.2);
  if(shown<line.length&&d.t%3===0)beep(L[d.i][0]==='brs'?520:760,null,.025,.025,'square');
  if(I.jp||I.xp||I.pp||(I.f&&!d.held)){if(shown<line.length)d.t=Math.ceil(line.length/1.2)+1;else{d.i++;d.t=0;if(d.i>=L.length){state='play';g.dialogSeen=true;bossStart();return;}}}
  d.held=I.f;}
