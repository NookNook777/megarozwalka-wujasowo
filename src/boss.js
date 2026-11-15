'use strict';
/* Agent B.R.S: fazy, ramiona, ataki; ulty, pociski, znajdźki, efekty */
const BOSS_SEQ=['walk','shoot','walk','lob','walk','whistle'];
const AF={ax:55,ay:26},AB={ax:46,ay:46};
/* B.R.S może się odwrócić (bs.face: -1 = w lewo, domyślnie; 1 = w prawo). Wszystkie pozycje liczone są dla
   ustawienia w lewo, a bmx() odbija je względem środka bossa. */
function bmx(bs,x){return (bs.face||-1)<0?x:2*(bs.x+86)-x;}
function bxr(bs,a,b){const p=bmx(bs,bs.x+a),q=bmx(bs,bs.x+b);return[Math.min(p,q),Math.max(p,q)];}
function faPos(bs){return{x:bmx(bs,bs.x+82),y:G-56+(bs.yo||0)};}
function baPos(bs){return{x:bmx(bs,bs.x+156),y:G-112+(bs.yo||0)};}
function faAng(bs){return -faAng0(bs);}
function faAng0(bs){const t=bs.fa.t;if(t<0)return Math.sin(bs.stT*.08)*.05;if(t<24)return -0.9*(t/24);if(t<30)return -0.9+1.25*((t-24)/6);if(t<44)return .35-.35*((t-30)/14);return 0;}
function baAng(bs){const t=bs.ba.t;if(t<0)return Math.sin(bs.stT*.07+1)*.06;if(t<14)return .25*(t/14);if(t<18)return .25-.55*((t-14)/4);return -.3+.3*Math.min(1,(t-18)/14);}
function armsAI(g,bs,P,enr){if(bs.fa.vul>0)bs.fa.vul--;if(bs.ba.vul>0)bs.ba.vul--;if(bs.st==='whistle'||bs.st==='stagger'||bs.st==='leap')return;
  const fa=bs.fa,ba=bs.ba;
  if(!fa.dead){if(fa.t>=0){fa.t++;if(fa.t===30){const p=faPos(bs);const fx=p.x+(bs.face||-1)*58;g.shake=10;noise(.4,.4,900,60);beep(90,40,.3,.2,'triangle');
        g.eb.push({x:fx,y:G-6,vx:-3.4,vy:0,g:0,r:10,k:'wave',dmg:20,life:140});g.eb.push({x:fx,y:G-6,vx:3.4,vy:0,g:0,r:10,k:'wave',dmg:20,life:60});
        for(let i=0;i<12;i++)g.parts.push({x:fx+(Math.random()-.5)*30,y:G-2,vx:(Math.random()-.5)*3,vy:-Math.random()*3,life:20,c:'#b8b0c0',s:2});}
      if(fa.t>=46){fa.t=-1;fa.vul=70;}}else if(--fa.cd<=0){fa.t=0;fa.vul=0;fa.cd=enr?130:170;beep(200,500,.25,.06,'sawtooth');}}
  if(!ba.dead){if(ba.t>=0){ba.t++;if(ba.t===16){const p=baPos(bs);const sx=p.x+(bs.face||-1)*46,sy=p.y-48,T=54,gg=.22,dx=P.x-sx,dy=(P.y-20)-sy;
        g.eb.push({x:sx,y:sy,vx:dx/T,vy:(dy-.5*gg*T*T)/T,g:gg,r:7,k:'bag',dmg:20,rot:0});noise(.2,.25,1200,200);}
      if(ba.t>=34){ba.t=-1;ba.vul=70;}}else if(--ba.cd<=0){ba.t=0;ba.vul=0;ba.cd=enr?100:140;}}}
function hitArm(a,d,x,y,isFront){const g=G_,bs=g.boss;if(!(a.t>=0||a.vul>0)){for(let i=0;i<3;i++)g.parts.push({x,y,vx:-1-Math.random()*2,vy:(Math.random()-.5)*3,life:8,c:'#d8d8e0',s:1});if((g.t&3)===0)beep(1900,1500,.03,.03,'square');return;}a.hp-=d;a.flash=4;dnum(x,y,d,'#ffb030');beep(700,250,.04,.05);spark(x,y,'#ffd060');
  if(a.hp<=0&&!a.dead){a.dead=true;a.t=-1;boom(x,y,3);S.big();g.shake=12;dmgBoss(12);dropCoins(x,y,6);msgShow(isFront?'PIĘŚĆ ZNISZCZONA!':'MOŹDZIERZ ZNISZCZONY!',90);
    if(bs.fa.dead&&bs.ba.dead){msgShow('B.R.S WPADA W SZAŁ!',100);fiuFiu();}}}
function drawArm(bs,front,t){const a=front?bs.fa:bs.ba,p=front?faPos(bs):baPos(bs),A2=front?AF:AB,im=UP[front?'arm_front':'arm_back'];if(!im.complete)return;
  ctx.save();ctx.translate(Math.round(p.x),Math.round(p.y));if((bs.face||-1)>0)ctx.scale(-1,1);
  if(a.dead){const sw=Math.sin(t*.12)*2;
    // dangling broken cables
    ctx.lineWidth=2;ctx.strokeStyle='#111';ctx.beginPath();ctx.moveTo(-4,4);ctx.quadraticCurveTo(-10,14,-8+sw,24);ctx.stroke();
    ctx.strokeStyle='#c8302a';ctx.beginPath();ctx.moveTo(-1,5);ctx.quadraticCurveTo(-4,12,-1-sw,19);ctx.stroke();
    ctx.strokeStyle='#d8a020';ctx.beginPath();ctx.moveTo(3,4);ctx.quadraticCurveTo(6,10,4+sw*.6,15);ctx.stroke();
    // round shoulder joint only (circular clip), scorched
    ctx.save();ctx.beginPath();ctx.arc(0,0,10,0,6.3);ctx.clip();ctx.filter='brightness(.55) saturate(.7)';ctx.drawImage(im,-A2.ax,-A2.ay);ctx.restore();
    ctx.strokeStyle='#000';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(0,0,10,0,6.3);ctx.stroke();
    ctx.fillStyle='#222';ctx.beginPath();ctx.arc(-6,1,3,0,6.3);ctx.fill();ctx.restore();
    if((t>>2)%3===0)G_.parts.push({x:p.x-8+sw+(Math.random()-.5)*3,y:p.y+22,vx:(Math.random()-.5)*2,vy:-Math.random()*1.5,life:10,c:Math.random()<.5?'#ffd060':'#fff',s:1});
    if((t>>2)%3===0)G_.parts.push({x:p.x+(Math.random()-.5)*10,y:p.y+(Math.random()-.5)*10,vx:(Math.random()-.5)*2,vy:-Math.random()*2,life:10,c:Math.random()<.5?'#ffd060':'#fff',s:1});
    if(t%10===0)G_.parts.push({x:p.x,y:p.y-6,vx:(Math.random()-.5)*.6,vy:-.8,life:30,c:'#555',s:3});return;}
  ctx.rotate(front?faAng(bs):baAng(bs));if(a.flash&1)ctx.filter='brightness(2.5)';
  if((front&&a.t>=0&&a.t<24)||(!front&&a.t>=0&&a.t<14)){if((t>>1)&1)ctx.filter='brightness(1.7) sepia(1) hue-rotate(-40deg) saturate(3)';}
  ctx.drawImage(im,-A2.ax,-A2.ay);ctx.restore();
  if(a.t>=0||a.vul>0){const pulse=.5+.5*Math.sin(t*.4);ctx.fillStyle=`rgba(255,220,60,${.35+.4*pulse})`;ctx.beginPath();ctx.arc(Math.round(p.x),Math.round(p.y),7+pulse*2,0,6.3);ctx.fill();ctx.fillStyle='#fff';ctx.fillRect(Math.round(p.x)-1,Math.round(p.y)-1,3,3);}}
function armHit(bs,b){// returns 'fa'/'ba' if bullet hits a living, currently vulnerable arm (armored arms let bullets through to the body)
  const vuln=a=>a.t>=0||a.vul>0;
  const fc=bs.face||-1;
  if(!bs.fa.dead&&vuln(bs.fa)){const p=faPos(bs);const ang=faAng(bs);const fx=p.x+fc*50*Math.cos(ang),fy=p.y-50*Math.sin(ang);
    const lo=Math.min(p.x,fx)-(fc<0?26:6),hi=Math.max(p.x,fx)+(fc<0?6:26);
    if(b.x>lo&&b.x<hi&&b.y>Math.min(p.y,fy)-22&&b.y<Math.max(p.y,fy)+34)return 'fa';}
  if(!bs.ba.dead&&vuln(bs.ba)){const p=baPos(bs);const lo=fc<0?p.x-52:p.x-8,hi=fc<0?p.x+8:p.x+52;if(b.x>lo&&b.x<hi&&b.y>p.y-58&&b.y<p.y+6)return 'ba';}
  return null;}
const TALK2=['Moja herbata się nie poddaje!','Zaraz się zagotuję!'],TALK3=['TERAZ SIĘ ZAGOTUJE!','Wrzątek dla wszystkich!'];
function bossTalk(bs,txt){bs.talk={txt,t:150};}
function bossAI(g,bs,P){bs.stT++;
  const ph=bs.hp<bs.max/3?3:(bs.hp<bs.max*2/3||bs.fa.dead||bs.ba.dead)?2:1;
  if(ph>bs.phase){bs.phase=ph;bs.st='stagger';bs.stT=0;g.shake=14;S.big();bossTalk(bs,(ph===2?TALK2:TALK3)[Math.floor(Math.random()*2)]);msgShow(ph===2?'B.R.S SIĘ CHWIEJE! CELUJ W GŁOWĘ!':'B.R.S WPADA W SZAŁ!',100);}
  if(bs.st!=='leap'&&(bs.yo<0||bs.vy)){bs.vy=(bs.vy||0)+.5;bs.yo=Math.min(0,bs.yo+bs.vy);if(bs.yo>=0){bs.yo=0;bs.vy=0;g.shake=Math.max(g.shake,8);}} // np. faza zmieniła się w trakcie skoku
  const enr=bs.phase>=3;armsAI(g,bs,P,enr);if(bs.fa.flash>0)bs.fa.flash--;if(bs.ba.flash>0)bs.ba.flash--;if(bs.talk&&--bs.talk.t<=0)bs.talk=null;
  const SEQ=bs.phase===1?['walk','shoot','walk','lob','walk','whistle']:['walk','shoot','leap','walk','lob','walk','whistle'];
  const next=()=>{bs.step=(bs.step+1)%SEQ.length;bs.st=SEQ[bs.step];bs.stT=0;if(bs.st==='whistle'){whistleS();msgShow('UWAGA! CZAJNIK SIĘ GOTUJE!',90);}if(bs.st==='leap'){bs.lx=Math.max(Math.max(ARENA+150,(bs.minX||ARENA+150)-60),Math.min(LEN-180,P.x-86));beep(160,320,.5,.08,'sawtooth');}};
  const fast=bs.phase===1?1:bs.phase===2?1.25:1.5;
  if(bs.st==='stagger'){for(let i=0;i<2;i++)if((bs.stT&3)===0)g.parts.push({x:bs.x+40+Math.random()*100,y:G-60-Math.random()*90,vx:(Math.random()-.5)*2,vy:-Math.random()*2,life:16,c:Math.random()<.5?'#ffd060':'#fff',s:1});
    if(bs.stT>=100){bs.st='walk';bs.stT=0;bs.step=0;}}
  else if(bs.st==='walk'){const want=P.x-(bs.x+86);if(Math.abs(want)>40&&bs.stT%20===0)bs.face=want<0?-1:1;
    bs.minX=Math.max(ARENA+140,(bs.minX===undefined?LEN-300:bs.minX)-.09*fast); // stopniowe skracanie dystansu
    if(Math.abs(want)>170)bs.dir=want<0?-1:1;else if((bs.stT%60)===0)bs.dir=-bs.dir;if(bs.x<=bs.minX&&bs.dir<0)bs.dir=1;bs.x+=.6*fast*bs.dir;if(bs.x<ARENA+140)bs.x=ARENA+140;if(bs.x>LEN-180){bs.x=LEN-180;bs.dir=-1;}if(bs.stT>110/fast)next();}
  else if(bs.st==='shoot'){const per=Math.round(26/fast),n=bs.phase===1?2:3;const p=bs.stT%per;if(p===Math.round(10/fast)){const sx=bmx(bs,bs.x+8),sy=G-96;const tx=P.x,ty=P.y-30;const d=Math.hypot(tx-sx,ty-sy)||1;g.eb.push({x:sx,y:sy,vx:(tx-sx)/d*4.6,vy:(ty-sy)/d*4.6,g:0,r:8,k:'tea',dmg:20});noise(.2,.25,1400,200);beep(220,90,.15,.1,'triangle');g.shake=4;}
    if(enr&&bs.stT===12&&!bs.ba.dead&&bs.ba.t<0){bs.ba.t=0;}
    if(bs.stT>=per*n)next();}
  else if(bs.st==='lob'){if(bs.stT===10||(bs.phase>1&&bs.stT===30)){const sx=bmx(bs,bs.x+18),sy=G-118;const dx=P.x-sx,t=46;g.eb.push({x:sx,y:sy,vx:dx/t,vy:-5,g:.22,r:7,k:'tea',dmg:15});g.eb.push({x:sx,y:sy,vx:dx/t*.6,vy:-6.5,g:.22,r:7,k:'tea',dmg:15});if(bs.phase>1)g.eb.push({x:sx,y:sy,vx:dx/t*1.3,vy:-4,g:.22,r:7,k:'tea',dmg:15});beep(300,120,.15,.08,'triangle');}
    if(enr&&bs.stT===20){for(let i=0;i<2;i++)g.en.push({k:'rat',x:bmx(bs,bs.x+10-i*16),y:G,vx:0,vy:-3,hp:ET.rat.hp,face:P.x<bs.x+86?-1:1,chase:true,active:true,t:0,cd:60,at:-1,flash:0,dead:false,ground:false,turnT:0});beep(1200,700,.1,.06);}
    if(bs.stT>=48)next();}
  else if(bs.st==='leap'){const T=30;
    if(bs.stT<T){if((bs.stT>>2)&1)bs.flash=1;bs.yo=Math.min(0,Math.sin(bs.stT*.9)*2);}
    else{if(bs.stT===T){bs.vy=-9;bs.lsx=bs.x;bs.ldur=48;}
      const k=Math.min(1,(bs.stT-T)/bs.ldur);bs.x=bs.lsx+(bs.lx-bs.lsx)*k;bs.vy+=.375;bs.yo=Math.min(0,bs.yo+bs.vy);
      if(bs.stT-T>=bs.ldur){bs.yo=0;bs.vy=0;g.shake=16;S.big();const cx=bs.x+86;g.eb.push({x:cx-60,y:G-6,vx:-3.6,vy:0,g:0,r:10,k:'wave',dmg:20,life:150},{x:cx+60,y:G-6,vx:3.6,vy:0,g:0,r:10,k:'wave',dmg:20,life:80});
        for(let i=0;i<20;i++)g.parts.push({x:cx+(Math.random()-.5)*150,y:G-2,vx:(Math.random()-.5)*4,vy:-Math.random()*3,life:24,c:'#b8b0c0',s:2});next();}}}
  else if(bs.st==='whistle'){if(bs.stT%8===0)for(let i=0;i<3;i++)g.parts.push({x:bs.x+86+(Math.random()-.5)*30,y:G-170,vx:(Math.random()-.5)*1.2,vy:-1.5-Math.random(),life:30,c:'#f4f0ff',s:3});
    if(Math.abs(P.x-(bs.x+86))<24&&P.y<G-150)hurt(10,bs.x+86);
    if(bs.stT>=(bs.phase===1?160:bs.phase===2?130:110))next();}
  if(Math.abs(P.x-(bs.x+86))<70&&P.y>G-140+bs.yo&&P.y-60<G+bs.yo)hurt(bs.st==='leap'?25:20,bs.x+86);}
function whistleS(){if(!ac)return;const t=ac.currentTime,o=ac.createOscillator(),gg=ac.createGain();o.type='sine';o.frequency.setValueAtTime(1800,t);o.frequency.linearRampToValueAtTime(2600,t+.6);gg.gain.setValueAtTime(.0001,t);gg.gain.linearRampToValueAtTime(.08,t+.2);gg.gain.setValueAtTime(.08,t+1.4);gg.gain.exponentialRampToValueAtTime(.0001,t+1.8);o.connect(gg);gg.connect(OUT());o.start(t);o.stop(t+1.9);noise(1.5,.12,6000,2000);}
function hitEnemy(e,d){const T=ET[e.k];e.hp-=d;e.flash=4;beep(820,300,.04,.04);if(e.hp<=0&&!e.dead){e.dead=true;slimeBoom(e.x,e.y-T.h/2,e.k==='kan'?3:e.k==='rat'?1:2);S.boom();dropCoins(e.x,e.y-T.h/2,T.coins);addUlt(T.ult);}}
function slimeBoom(x,y,s){for(let i=0;i<14*s;i++){const a=Math.random()*6.28,v=Math.random()*2.4*s;G_.parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-.8,life:16+Math.random()*22,c:['#9aff5a','#3cc42a','#d8ff90','#1e7a18','#fff'][Math.floor(Math.random()*5)],s:1+Math.floor(Math.random()*3)});}}
const CUT={b:46,m:56,l:50};
function stepGren(){const g=G_;if(!g.gren)return;const q=g.gren;q.t++;q.vy+=.28;q.x+=q.vx;q.y+=q.vy;q.vx*=.985;if(q.y>=G-6||q.t>48){g.gren=null;flashBang(q.x,Math.min(q.y,G-10));}}
function updCut(){const g=G_,c=g.cut;c.t++;
  for(const p of g.parts){p.x+=p.vx;p.y+=p.vy;p.life--;}g.parts=g.parts.filter(p=>p.life>0);
  if(g.hero==='m'&&c.t===30){beep(2600,1800,.05,.1,'square');noise(.05,.25,6000,3000);snapDust();}
  if(g.hero==='b'&&c.t===18){beep(520,200,.12,.08);const P=g.P;g.gren={x:P.x+22*P.face,y:P.y-44,vx:5.4*P.face,vy:-4.6,t:0};}
  if(g.hero==='b'&&c.t>18)stepGren();
  if(g.hero==='l'){g.shake=3;}
  if(c.t>=CUT[g.hero]){state='play';const P=g.P;P.inv=Math.max(P.inv,20);
    if(g.hero==='m'){g.ultT=240;}else if(g.hero==='l'){g.ultT=BEAM_T;beamStart();}else{g.ultT=360;g.shake=8;}}}
function flashBang(x,y){const g=G_;g.flash=18;g.shake=12;S.big();boom(x,y,3);
  for(const b of g.barrels)if(!b.dead&&b.x>g.camX-20&&b.x<g.camX+W+20){b.dead=true;boom(b.x,b.y-18,2);dropCoins(b.x,b.y-20,2);}
  for(const e of g.en)if(!e.dead&&e.active&&e.x>g.camX-20&&e.x<g.camX+W+20)hitEnemy(e,e.k==='kan'?10:99);
  if(!g.boss.dead&&g.boss.x<g.camX+W){dmgBoss(g.boss.max*.25);}}
function fiuFiu(){if(!ac)return;[0,.32].forEach(d=>{const t=ac.currentTime+d,o=ac.createOscillator(),gg=ac.createGain();o.type='sine';o.frequency.setValueAtTime(900,t);o.frequency.exponentialRampToValueAtTime(2200,t+.12);o.frequency.exponentialRampToValueAtTime(1100,t+.26);gg.gain.setValueAtTime(.0001,t);gg.gain.linearRampToValueAtTime(.12,t+.03);gg.gain.exponentialRampToValueAtTime(.0001,t+.28);o.connect(gg);gg.connect(OUT());o.start(t);o.stop(t+.3);});
  setTimeout(()=>{noise(.5,.3,1800,90);beep(140,60,.5,.2,'triangle');},800);}
function spinUp(){if(!ac)return;const t=ac.currentTime,o=ac.createOscillator(),gg=ac.createGain();o.type='sawtooth';o.frequency.setValueAtTime(60,t);o.frequency.exponentialRampToValueAtTime(900,t+.8);gg.gain.setValueAtTime(.001,t);gg.gain.linearRampToValueAtTime(.09,t+.6);gg.gain.exponentialRampToValueAtTime(.0001,t+.9);o.connect(gg);gg.connect(OUT());o.start(t);o.stop(t+.95);}
function dmgBoss(d,head,x,y){const bs=G_.boss;bs.hp-=d;dnum(x===undefined?bs.x+90:x,y===undefined?G-150:y,d,head?'#ffe066':'#ff8ad0');bs.flash=4;addUlt(d*.45);if(head)beep(1200,600,.05,.07);else beep(500,200,.04,.05);if(bs.hp<=0&&!bs.dead){bs.dead=true;beamStop();G_.ultT=0;bs.t=0;S.big();G_.eb=[];msgShow('AGENT B.R.S POKONANY!',99999);dropCoins(bs.x+60,G-90,12);}}
function dropCoins(x,y,n){for(let i=0;i<n;i++)G_.coinsL.push({x:x+(Math.random()-.5)*20,y,vx:(Math.random()-.5)*3,vy:-3-Math.random()*2,got:false});}
const DROPS=[['dopalka',25],['kamizelka',9],['folia',7],['energetyk',6],['magnes',5],['klapki',5],['drugie_sniadanie',7],['kebab',4],['petardy',6],['kapsle',6],['tuptus',6],['kawa',6],['nalewka',4],['pierogi',4],['smalec',1.5]];
function dropItem(x,y,force){let k=force;if(!k){const tot=DROPS.reduce((a,d)=>a+d[1],0);let r=Math.random()*tot;for(const d of DROPS){r-=d[1];if(r<=0){k=d[0];break;}}k=k||'dopalka';}G_.items.push({x,y,vy:-3,bounce:true,k});}
function collect(k){const g=G_;S.pick();
  const N={dopalka:'DOPAŁKA',kamizelka:'KAMIZELKA',folia:'FOLIA ALUMINIOWA',energetyk:'ENERGETYK',magnes:'MAGNES Z LODÓWKI',klapki:'KLAPECZKI WIPMENY',drugie_sniadanie:'KANAPKA Z JAJCUSZKIEM',kebab:'KEBAB MIESIANY',petardy:'PETARDY Z BAZARU',kapsle:'KAPSLE OD ORANŻADY',tuptus:'CHOMIK TUPTUŚ',kawa:'KAWA Z EKSPRESU',nalewka:'NALEWKA DZIADKA',pierogi:'ŁÓDZKIE PIEROGI',smalec:'SMALEC BABCI'};
  const FX={kamizelka:'-50% OBRAŻEŃ · 4 TRAFIENIA',folia:'TARCZA NA 10 S',energetyk:'+50% ULTA',magnes:'PRZYCIĄGA ZŁOTÓWKI',klapki:'SZYBSZY BIEG',drugie_sniadanie:'+40 HP',kebab:'+40 HP',petardy:'WYBUCHOWE POCISKI · 12 S',kapsle:'POCISKI SIĘ ODBIJAJĄ · 12 S',tuptus:'POMOCNIK STRZELA · 15 S',kawa:'STRZAŁ 2× SZYBCIEJ · 10 S',nalewka:'WROGOWIE ZWALNIAJĄ · 5 S',pierogi:'3 PIEROGI ŁAPIĄ POCISKI',smalec:'+1 ŻYCIE'};
  // nadwyżka: bonus, którego już nie da się wzmocnić, zamienia się w trochę ulta (+ złotówki) zamiast przepadać
  const food=k==='drugie_sniadanie'||k==='kebab';
  if(FXDUR[k]){fxStart(k);msgShow(N[k],80,FX[k]);return;}
  const extra=(k==='smalec'&&g.lives>=5)?10:(k==='dopalka'&&g.wl>=3)?20:((k==='magnes'&&g.magnet)||(k==='klapki'&&g.fast))?10:(food&&g.hp>=100)?10:0;
  if(extra){addUlt(extra);g.coins+=3;S.coin();msgShow(N[k],90,'NADWYŻKA: +'+extra+'% ULTA · +3 ZŁ');return;}
  if(k==='dopalka'){g.wl=Math.min(3,g.wl+1);}else if(k==='kamizelka')g.armor=4;else if(k==='folia')g.barrier=600;else if(k==='energetyk')addUlt(50);
  else if(k==='magnes')g.magnet=true;else if(k==='klapki')g.fast=true;else if(food)g.hp=Math.min(100,g.hp+40);else if(k==='smalec')g.lives++;
  msgShow(N[k],80,k==='dopalka'?'BROŃ POZIOM '+g.wl:FX[k]);}
function muzzle(){const P=G_.P,M=META(P.anim);let lx,ly;if(P.anim==='jump'){lx=FW/2+18;ly=FW-36;}else{const q=M.muz[P.fr]||M.muz[0];lx=q[0];ly=q[1];}
  return{x:P.x+(lx-(FW/2-4))*P.face,y:P.y-(FW-1-ly)};}
function fire(){const g=G_,P=g.P,h=g.h;let dx=P.face,dy=0;
  if(P.anim==='up')dy=-1;else if(P.anim==='down')dy=1;else if(P.anim==='jump'){if(I.u)dy=-1;else if(I.d)dy=1;}
  const m=muzzle();let sx=m.x,sy=m.y;if(P.anim==='jump'&&dy!==0){sx=P.x+14*P.face;sy=dy<0?P.y-50:P.y-24;}
  const wl=g.wl;
  const base=Math.atan2(dy,dx);const add=(a,o)=>g.bullets.push(Object.assign({x:sx,y:sy,vx:Math.cos(a)*h.spd,vy:Math.sin(a)*h.spd,life:90,dmg:h.dmg,sc:1},o));
  if(g.hero==='b'){if(wl===1)add(base);else if(wl===2){const nx=-Math.sin(base)*3,ny=Math.cos(base)*3;add(base,{x:sx+nx,y:sy+ny});add(base,{x:sx-nx,y:sy-ny});}else[-.12,0,.12].forEach(d=>add(base+d));}
  else if(g.hero==='m'){if(wl>=3)add(base,{pierce:true,heavy:true,dmg:h.dmg+1.2,sc:1.45});else add(base,{pierce:true});}
  else{if(wl===1)add(base);else if(wl===2)add(base,{dmg:h.dmg+1,sc:1.4});else[-.16,0,.16].forEach(d=>add(base+d,{dmg:h.dmg+.5,sc:1.2}));}
  P.flashT=3;beep(h.snd[0],h.snd[1],.06,.05,h.snd[2]);}
function spark(x,y,c){for(let i=0;i<4;i++)G_.parts.push({x,y,vx:(Math.random()-.5)*3,vy:(Math.random()-.5)*3,life:8+Math.random()*6,c,s:1});}
function boom(x,y,s){for(let i=0;i<10*s;i++){const a=Math.random()*6.28,v=Math.random()*2.2*s;G_.parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-.5,life:18+Math.random()*20,c:['#fff','#ffe066','#ff9a2e','#e0401e','#9aff5a'][Math.floor(Math.random()*5)],s:1+Math.floor(Math.random()*3)});}}

/* liczby obrażeń: trafienia w ten sam cel w krótkim czasie sumują się w jedną liczbę */
function dnum(x,y,d,c){const g=G_;g.dn=g.dn||[];const n=g.dn.find(q=>q.c===c&&q.age<18&&Math.abs(q.x-x)<70);
  if(n){n.v+=d;n.age=Math.min(n.age,6);n.pop=4;}else g.dn.push({x,y:y-8,v:d,c,age:0,pop:4});}
function updDnum(){const g=G_;if(!g.dn)return;for(const q of g.dn){q.age++;q.y-=.45;if(q.pop>0)q.pop--;}g.dn=g.dn.filter(q=>q.age<55);}
function drawDnum(){const g=G_;if(!g.dn)return;ctx.font='8px "Press Start 2P",monospace';ctx.textAlign='center';
  for(const q of g.dn){const t=q.v<1?q.v.toFixed(1):q.v<10?q.v.toFixed(1).replace('.0',''):String(Math.round(q.v));const al=q.age>40?(55-q.age)/15:1;ctx.globalAlpha=al;
    const yy=Math.round(q.y-(q.pop>0?2:0));ctx.fillStyle='#000';ctx.fillText('-'+t,Math.round(q.x)+1,yy+1);ctx.fillStyle=q.c;ctx.fillText('-'+t,Math.round(q.x),yy);}
  ctx.globalAlpha=1;ctx.textAlign='left';}

/* ---------- Ult Łysej: plazmowy promień ----------
   4 s ciągłego promienia przez cały ekran w stronę, w którą patrzy (można się obracać, nie można chodzić ani skakać).
   Balans: łącznie ~40 HP bossa (25%, jak granat Badziejka) bez kary 20% za ciało; ramiona dostają ~36 (nie
   rozwala ramienia w pojedynkę); zwykli wrogowie topią się szybko; promień kasuje wrogie pociski. Łysa nietykalna. */
const BEAM_T=240,BEAM_TICK=4,BEAM_BOSS=40/(BEAM_T/BEAM_TICK),BEAM_ARM=.6,BEAM_EN=2;
let beamOsc=null;
function beamStart(){const g=G_;g.beamT=0;g.shake=6;if(!ac)return;const t=ac.currentTime,o=ac.createOscillator(),o2=ac.createOscillator(),gg=ac.createGain(),lf=ac.createOscillator(),lg=ac.createGain();
  o.type='sawtooth';o.frequency.value=92;o2.type='square';o2.frequency.value=184.7;lf.frequency.value=14;lg.gain.value=18;lf.connect(lg);lg.connect(o.frequency);
  gg.gain.setValueAtTime(.0001,t);gg.gain.linearRampToValueAtTime(.022,t+.15);o.connect(gg);o2.connect(gg);gg.connect(OUT());const end=t+BEAM_T/60+.25;gg.gain.setValueAtTime(.022,end-.3);gg.gain.exponentialRampToValueAtTime(.0001,end);[o,o2,lf].forEach(x=>{x.start(t);x.stop(end+.05);});beamOsc={o,o2,lf,gg};} // twardy limit: buczenie nigdy nie trwa dłużej niż sam promień
function beamStop(){if(!beamOsc||!ac)return;const t=ac.currentTime,b=beamOsc;beamOsc=null;try{b.gg.gain.cancelScheduledValues(t);b.gg.gain.setValueAtTime(.022,t);b.gg.gain.exponentialRampToValueAtTime(.0001,t+.2);[b.o,b.o2,b.lf].forEach(x=>{try{x.stop(t+.25);}catch(e){}});}catch(e){}}
function beamGeom(g,P){const m=muzzle();const x0=m.x,x1=P.face>0?g.camX+W+4:g.camX-4;return{x0,x1,y:m.y,lo:Math.min(x0,x1),hi:Math.max(x0,x1)};}
function beamTick(g,P){g.beamT=(g.beamT||0)+1;if(g.t%3===0)g.shake=Math.max(g.shake,2);const b=beamGeom(g,P),tick=g.beamT%BEAM_TICK===0,R=7;
  for(const q of g.eb)if(q.k!=='wave'&&q.x>b.lo&&q.x<b.hi&&Math.abs(q.y-b.y)<R+(q.r||4)){q.dead=true;q.life=0;spark(q.x,q.y,'#ff5ad0');}
  g.eb=g.eb.filter(q=>!q.dead);
  for(const c of g.capsA)if(!c.dead&&c.x>b.lo&&c.x<b.hi&&Math.abs(c.y-b.y)<R+12){c.dead=true;boom(c.x,c.y,1);S.boom();dropItem(c.x,c.y,c.k);}
  if(!tick)return;
  for(const br of g.barrels){if(br.dead||br.x<b.lo||br.x>b.hi||!(b.y>br.y-40-R&&b.y<br.y+R))continue;br.hp-=BEAM_EN;br.flash=4;spark(br.x,b.y,'#ff5ad0');if(br.hp<=0){br.dead=true;boom(br.x,br.y-18,2);S.boom();addUlt(8);dropCoins(br.x,br.y-20,3);}}
  for(const e of g.en){if(e.dead||!e.active||e.x<b.lo||e.x>b.hi)continue;const T=ET[e.k];if(b.y>e.y-T.h-R&&b.y<e.y+R){hitEnemy(e,BEAM_EN);spark(e.x,b.y,'#ff5ad0');}}
  const bs=g.boss;if(bs.dead||!bs.active)return;const yo=bs.yo||0;
  const armIn=(k)=>{const a=bs[k];if(a.dead)return false;const p=k==='fa'?faPos(bs):baPos(bs);const ylo=k==='fa'?p.y-40:p.y-58,yhi=k==='fa'?p.y+34:p.y+6,xc=p.x+(bs.face||-1)*(k==='fa'?30:24);return xc>b.lo&&xc<b.hi&&b.y>ylo&&b.y<yhi?xc:false;};
  for(const k of ['fa','ba']){const xc=armIn(k);if(xc!==false){const a=bs[k],v=a.vul;a.vul=Math.max(1,a.vul);hitArm(a,BEAM_ARM,xc,b.y,k==='fa');if(!a.dead)a.vul=v;}}
  const BB=bxr(bs,34,160);if(BB[0]<b.hi&&BB[1]>b.lo&&b.y>G-200+yo&&b.y<G+yo){const hx=P.face>0?Math.max(b.lo,BB[0]+6):Math.min(b.hi,BB[1]-10);dmgBoss(BEAM_BOSS,false,hx,b.y);spark(hx,b.y,'#fff');spark(hx,b.y,'#ff5ad0');}}
function drawBeam(g,P){const b=beamGeom(g,P),T=g.beamT||0,left=g.ultT;const grow=Math.min(1,T/10),fade=Math.min(1,left/14),k=grow*fade;if(k<=0)return;
  const fl=(g.t&1)?1:0,len=(b.x1-b.x0)*Math.min(1,T/6),x=Math.min(b.x0,b.x0+len),w=Math.abs(len);
  ctx.globalAlpha=.3*k;ctx.fillStyle='#ff5ad0';ctx.fillRect(x,Math.round(b.y-11-fl),w,22+fl*2);
  ctx.globalAlpha=.85*k;ctx.fillStyle='#ff5ad0';ctx.fillRect(x,Math.round(b.y-6),w,12);
  ctx.fillStyle='#ffb0ec';ctx.fillRect(x,Math.round(b.y-3-fl),w,6+fl*2);ctx.fillStyle='#fff';ctx.fillRect(x,Math.round(b.y-1),w,3);
  ctx.globalAlpha=k;for(let i=0;i<6;i++){const px=x+((g.t*7+i*53)%Math.max(1,w|0)),py=b.y+((i*37+g.t*3)%15)-7;ctx.fillStyle=i&1?'#fff':'#ffd0f0';ctx.fillRect(Math.round(px),Math.round(py),2,1);}
  ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(Math.round(b.x0),Math.round(b.y),7+fl*2,0,6.3);ctx.fill();ctx.globalAlpha=1;}

/* ---------- Marewik: ciężki karabin ----------
   odrzut trafionych wrogów, na poz. 3 ciężkie pociski z małym wybuchem; ult „No i pyk!” — pstryk obraca wrogów w pył */
function marewikImpact(e,b){const g=G_;if(e.dead)return;const dir=Math.sign(b.vx)||1,kb=e.k==='kan'?2:e.k==='barrel'?3:6;
  if(e.ground!==false&&!isPit(e.x+dir*(kb+14))&&e.x+dir*kb<ARENA-12)e.x+=dir*kb;
  if(b.heavy)petarda(b.x,b.y,b.dmg*1.2);}
function snapDust(){const g=G_;g.flash=10;g.shake=10;
  const dust=(x,y,n)=>{for(let i=0;i<n;i++)g.parts.push({x:x+(Math.random()-.5)*20,y:y+(Math.random()-.5)*30,vx:Math.random()*1.5+.3,vy:-Math.random()*1.4,life:30+Math.random()*30,c:['#8a7a6a','#b8a890','#5a4a3a','#d8c8b0'][Math.floor(Math.random()*4)],s:1+Math.floor(Math.random()*2)});};
  for(const e of g.en)if(!e.dead&&e.active&&e.x>g.camX-20&&e.x<g.camX+W+20){const T=ET[e.k];dust(e.x,e.y-T.h/2,26);e.dead=true;dropCoins(e.x,e.y-T.h/2,T.coins);}
  for(const br of g.barrels)if(!br.dead&&br.x>g.camX-20&&br.x<g.camX+W+20){dust(br.x,br.y-18,20);br.dead=true;dropCoins(br.x,br.y-20,2);}
  g.eb=g.eb.filter(q=>{if(q.x>g.camX-20&&q.x<g.camX+W+20){dust(q.x,q.y,4);return false;}return true;});
  const bs=g.boss;if(!bs.dead&&bs.active&&bs.x<g.camX+W){dust(bs.x+86,G-100,40);dmgBoss(bs.max*.15);}}
