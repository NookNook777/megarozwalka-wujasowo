'use strict';
/* Agent B.R.S: fazy, ramiona, ataki; ulty, pociski, znajdźki, efekty */
const BOSS_SEQ=['walk','shoot','walk','lob','walk','whistle'];
const AF={ax:55,ay:26},AB={ax:46,ay:46};
function faPos(bs){return{x:bs.x+82,y:G-56+(bs.yo||0)};}
function baPos(bs){return{x:bs.x+156,y:G-112+(bs.yo||0)};}
function faAng(bs){return -faAng0(bs);}
function faAng0(bs){const t=bs.fa.t;if(t<0)return Math.sin(bs.stT*.08)*.05;if(t<24)return -0.9*(t/24);if(t<30)return -0.9+1.25*((t-24)/6);if(t<44)return .35-.35*((t-30)/14);return 0;}
function baAng(bs){const t=bs.ba.t;if(t<0)return Math.sin(bs.stT*.07+1)*.06;if(t<14)return .25*(t/14);if(t<18)return .25-.55*((t-14)/4);return -.3+.3*Math.min(1,(t-18)/14);}
function armsAI(g,bs,P,enr){if(bs.fa.vul>0)bs.fa.vul--;if(bs.ba.vul>0)bs.ba.vul--;if(bs.st==='whistle'||bs.st==='stagger'||bs.st==='leap')return;
  const fa=bs.fa,ba=bs.ba;
  if(!fa.dead){if(fa.t>=0){fa.t++;if(fa.t===30){const p=faPos(bs);const fx=p.x-58;g.shake=10;noise(.4,.4,900,60);beep(90,40,.3,.2,'triangle');
        g.eb.push({x:fx,y:G-6,vx:-3.4,vy:0,g:0,r:10,k:'wave',dmg:20,life:140});g.eb.push({x:fx,y:G-6,vx:3.4,vy:0,g:0,r:10,k:'wave',dmg:20,life:60});
        for(let i=0;i<12;i++)g.parts.push({x:fx+(Math.random()-.5)*30,y:G-2,vx:(Math.random()-.5)*3,vy:-Math.random()*3,life:20,c:'#b8b0c0',s:2});}
      if(fa.t>=46){fa.t=-1;fa.vul=70;}}else if(--fa.cd<=0){fa.t=0;fa.vul=0;fa.cd=enr?130:170;beep(200,500,.25,.06,'sawtooth');}}
  if(!ba.dead){if(ba.t>=0){ba.t++;if(ba.t===16){const p=baPos(bs);const sx=p.x-46,sy=p.y-48,T=54,gg=.22,dx=P.x-sx,dy=(P.y-20)-sy;
        g.eb.push({x:sx,y:sy,vx:dx/T,vy:(dy-.5*gg*T*T)/T,g:gg,r:7,k:'bag',dmg:20,rot:0});noise(.2,.25,1200,200);}
      if(ba.t>=34){ba.t=-1;ba.vul=70;}}else if(--ba.cd<=0){ba.t=0;ba.vul=0;ba.cd=enr?100:140;}}}
function hitArm(a,d,x,y,isFront){const g=G_,bs=g.boss;if(!(a.t>=0||a.vul>0)){for(let i=0;i<3;i++)g.parts.push({x,y,vx:-1-Math.random()*2,vy:(Math.random()-.5)*3,life:8,c:'#d8d8e0',s:1});if((g.t&3)===0)beep(1900,1500,.03,.03,'square');return;}a.hp-=d;a.flash=4;beep(700,250,.04,.05);spark(x,y,'#ffd060');
  if(a.hp<=0&&!a.dead){a.dead=true;a.t=-1;boom(x,y,3);S.big();g.shake=12;dmgBoss(12);dropCoins(x,y,6);addUlt(15);msgShow(isFront?'PIĘŚĆ ZNISZCZONA!':'MOŹDZIERZ ZNISZCZONY!',90);
    if(bs.fa.dead&&bs.ba.dead){msgShow('B.R.S WPADA W SZAŁ!',100);fiuFiu();}}}
function drawArm(bs,front,t){const a=front?bs.fa:bs.ba,p=front?faPos(bs):baPos(bs),A2=front?AF:AB,im=UP[front?'arm_front':'arm_back'];if(!im.complete)return;
  ctx.save();ctx.translate(Math.round(p.x),Math.round(p.y));
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
function armHit(bs,b){// returns 'fa'/'ba' if bullet hits a living arm
  if(!bs.fa.dead){const p=faPos(bs);const ang=faAng(bs);const fx=p.x-50*Math.cos(ang),fy=p.y-50*Math.sin(ang);
    if(b.x>Math.min(p.x,fx)-26&&b.x<p.x+6&&b.y>Math.min(p.y,fy)-22&&b.y<Math.max(p.y,fy)+34)return 'fa';}
  if(!bs.ba.dead){const p=baPos(bs);if(b.x>p.x-52&&b.x<p.x+8&&b.y>p.y-58&&b.y<p.y+6)return 'ba';}
  return null;}
const TALK2=['Moja herbata się nie poddaje!','Zaraz się zagotuję!'],TALK3=['TERAZ SIĘ ZAGOTUJE!','Wrzątek dla wszystkich!'];
function bossTalk(bs,txt){bs.talk={txt,t:150};}
function bossAI(g,bs,P){bs.stT++;
  const ph=bs.hp<bs.max/3?3:(bs.hp<bs.max*2/3||bs.fa.dead||bs.ba.dead)?2:1;
  if(ph>bs.phase){bs.phase=ph;bs.st='stagger';bs.stT=0;g.shake=14;S.big();bossTalk(bs,(ph===2?TALK2:TALK3)[Math.floor(Math.random()*2)]);msgShow(ph===2?'B.R.S SIĘ CHWIEJE! CELUJ W GŁOWĘ!':'B.R.S WPADA W SZAŁ!',100);}
  const enr=bs.phase>=3;armsAI(g,bs,P,enr);if(bs.fa.flash>0)bs.fa.flash--;if(bs.ba.flash>0)bs.ba.flash--;if(bs.talk&&--bs.talk.t<=0)bs.talk=null;
  const SEQ=bs.phase===1?['walk','shoot','walk','lob','walk','whistle']:['walk','shoot','leap','walk','lob','walk','whistle'];
  const next=()=>{bs.step=(bs.step+1)%SEQ.length;bs.st=SEQ[bs.step];bs.stT=0;if(bs.st==='whistle'){whistleS();msgShow('UWAGA! CZAJNIK SIĘ GOTUJE!',90);}if(bs.st==='leap'){bs.lx=Math.max(ARENA+150,Math.min(LEN-180,P.x-86));beep(160,320,.5,.08,'sawtooth');}};
  const fast=bs.phase===1?1:bs.phase===2?1.25:1.5;
  if(bs.st==='stagger'){for(let i=0;i<2;i++)if((bs.stT&3)===0)g.parts.push({x:bs.x+40+Math.random()*100,y:G-60-Math.random()*90,vx:(Math.random()-.5)*2,vy:-Math.random()*2,life:16,c:Math.random()<.5?'#ffd060':'#fff',s:1});
    if(bs.stT>=100){bs.st='walk';bs.stT=0;bs.step=0;}}
  else if(bs.st==='walk'){bs.x+=.6*fast*bs.dir;if(bs.x<ARENA+250){bs.x=ARENA+250;bs.dir=1;}if(bs.x>LEN-180){bs.x=LEN-180;bs.dir=-1;}if(bs.stT>110/fast)next();}
  else if(bs.st==='shoot'){const per=Math.round(26/fast),n=bs.phase===1?2:3;const p=bs.stT%per;if(p===Math.round(10/fast)){const sx=bs.x+8,sy=G-96;const tx=P.x,ty=P.y-30;const d=Math.hypot(tx-sx,ty-sy)||1;g.eb.push({x:sx,y:sy,vx:(tx-sx)/d*4.6,vy:(ty-sy)/d*4.6,g:0,r:8,k:'tea',dmg:20});noise(.2,.25,1400,200);beep(220,90,.15,.1,'triangle');g.shake=4;}
    if(enr&&bs.stT===12&&!bs.ba.dead&&bs.ba.t<0){bs.ba.t=0;}
    if(bs.stT>=per*n)next();}
  else if(bs.st==='lob'){if(bs.stT===10||(bs.phase>1&&bs.stT===30)){const sx=bs.x+18,sy=G-118;const dx=P.x-sx,t=46;g.eb.push({x:sx,y:sy,vx:dx/t,vy:-5,g:.22,r:7,k:'tea',dmg:15});g.eb.push({x:sx,y:sy,vx:dx/t*.6,vy:-6.5,g:.22,r:7,k:'tea',dmg:15});if(bs.phase>1)g.eb.push({x:sx,y:sy,vx:dx/t*1.3,vy:-4,g:.22,r:7,k:'tea',dmg:15});beep(300,120,.15,.08,'triangle');}
    if(enr&&bs.stT===20){for(let i=0;i<2;i++)g.en.push({k:'rat',x:bs.x+10-i*16,y:G,vx:0,vy:-3,hp:ET.rat.hp,face:-1,active:true,t:0,cd:60,at:-1,flash:0,dead:false,ground:false,turnT:0});beep(1200,700,.1,.06);}
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
function whistleS(){if(!ac)return;const t=ac.currentTime,o=ac.createOscillator(),gg=ac.createGain();o.type='sine';o.frequency.setValueAtTime(1800,t);o.frequency.linearRampToValueAtTime(2600,t+.6);gg.gain.setValueAtTime(.0001,t);gg.gain.linearRampToValueAtTime(.08,t+.2);gg.gain.setValueAtTime(.08,t+1.4);gg.gain.exponentialRampToValueAtTime(.0001,t+1.8);o.connect(gg);gg.connect(ac.destination);o.start(t);o.stop(t+1.9);noise(1.5,.12,6000,2000);}
function hitEnemy(e,d){const T=ET[e.k];e.hp-=d;e.flash=4;beep(820,300,.04,.04);if(e.hp<=0&&!e.dead){e.dead=true;slimeBoom(e.x,e.y-T.h/2,e.k==='kan'?3:e.k==='rat'?1:2);S.boom();dropCoins(e.x,e.y-T.h/2,T.coins);addUlt(T.ult);}}
function slimeBoom(x,y,s){for(let i=0;i<14*s;i++){const a=Math.random()*6.28,v=Math.random()*2.4*s;G_.parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-.8,life:16+Math.random()*22,c:['#9aff5a','#3cc42a','#d8ff90','#1e7a18','#fff'][Math.floor(Math.random()*5)],s:1+Math.floor(Math.random()*3)});}}
const CUT={b:46,m:56,l:50};
function stepGren(){const g=G_;if(!g.gren)return;const q=g.gren;q.t++;q.vy+=.28;q.x+=q.vx;q.y+=q.vy;q.vx*=.985;if(q.y>=G-6||q.t>48){g.gren=null;flashBang(q.x,Math.min(q.y,G-10));}}
function updCut(){const g=G_,c=g.cut;c.t++;
  for(const p of g.parts){p.x+=p.vx;p.y+=p.vy;p.life--;}g.parts=g.parts.filter(p=>p.life>0);
  if(g.hero==='m'&&c.t===30){beep(2600,1800,.05,.1,'square');noise(.05,.25,6000,3000);}
  if(g.hero==='b'&&c.t===18){beep(520,200,.12,.08);const P=g.P;g.gren={x:P.x+22*P.face,y:P.y-44,vx:5.4*P.face,vy:-4.6,t:0};}
  if(g.hero==='b'&&c.t>18)stepGren();
  if(g.hero==='l'){g.shake=3;}
  if(c.t>=CUT[g.hero]){state='play';const P=g.P;P.inv=Math.max(P.inv,20);
    if(g.hero==='m'){g.ultT=300;}else{g.ultT=360;g.shake=8;}}}
function flashBang(x,y){const g=G_;g.flash=18;g.shake=12;S.big();boom(x,y,3);
  for(const b of g.barrels)if(!b.dead&&b.x>g.camX-20&&b.x<g.camX+W+20){b.dead=true;boom(b.x,b.y-18,2);dropCoins(b.x,b.y-20,2);}
  for(const e of g.en)if(!e.dead&&e.active&&e.x>g.camX-20&&e.x<g.camX+W+20)hitEnemy(e,e.k==='kan'?10:99);
  if(!g.boss.dead&&g.boss.x<g.camX+W){dmgBoss(g.boss.max*.25);}}
function fiuFiu(){if(!ac)return;[0,.32].forEach(d=>{const t=ac.currentTime+d,o=ac.createOscillator(),gg=ac.createGain();o.type='sine';o.frequency.setValueAtTime(900,t);o.frequency.exponentialRampToValueAtTime(2200,t+.12);o.frequency.exponentialRampToValueAtTime(1100,t+.26);gg.gain.setValueAtTime(.0001,t);gg.gain.linearRampToValueAtTime(.12,t+.03);gg.gain.exponentialRampToValueAtTime(.0001,t+.28);o.connect(gg);gg.connect(ac.destination);o.start(t);o.stop(t+.3);});
  setTimeout(()=>{noise(.5,.3,1800,90);beep(140,60,.5,.2,'triangle');},800);}
function spinUp(){if(!ac)return;const t=ac.currentTime,o=ac.createOscillator(),gg=ac.createGain();o.type='sawtooth';o.frequency.setValueAtTime(60,t);o.frequency.exponentialRampToValueAtTime(900,t+.8);gg.gain.setValueAtTime(.001,t);gg.gain.linearRampToValueAtTime(.09,t+.6);gg.gain.exponentialRampToValueAtTime(.0001,t+.9);o.connect(gg);gg.connect(ac.destination);o.start(t);o.stop(t+.95);}
function dmgBoss(d,head){const bs=G_.boss;bs.hp-=d;bs.flash=4;addUlt(head?2:.8);if(head)beep(1200,600,.05,.07);else beep(500,200,.04,.05);if(bs.hp<=0&&!bs.dead){bs.dead=true;bs.t=0;S.big();G_.eb=[];msgShow('AGENT B.R.S POKONANY!',99999);dropCoins(bs.x+60,G-90,12);}}
function dropCoins(x,y,n){for(let i=0;i<n;i++)G_.coinsL.push({x:x+(Math.random()-.5)*20,y,vx:(Math.random()-.5)*3,vy:-3-Math.random()*2,got:false});}
function dropItem(x,y,force){const r=Math.random();const k=force?force:r<.3?'dopalka':r<.45?'kamizelka':r<.57?'folia':r<.67?'energetyk':r<.77?'magnes':r<.87?'klapki':'drugie_sniadanie';G_.items.push({x,y,vy:-3,bounce:true,k});}
function collect(k){const g=G_;S.pick();
  const L={dopalka:'DOPAŁKA',kamizelka:'KAMIZELKA · -50% OBRAŻEŃ',folia:'FOLIA ALUMINIOWA',energetyk:'ENERGETYK',magnes:'MAGNES Z LODÓWKI',klapki:'KLAPKI KUBOTA',drugie_sniadanie:'DRUGIE ŚNIADANIE · +40 HP'};
  if(k==='dopalka'){g.wl=Math.min(3,g.wl+1);}else if(k==='kamizelka')g.armor=4;else if(k==='folia')g.barrier=600;else if(k==='energetyk')addUlt(50);
  else if(k==='magnes')g.magnet=true;else if(k==='klapki')g.fast=true;else if(k==='drugie_sniadanie')g.hp=Math.min(100,g.hp+40);
  msgShow(L[k]+(k==='dopalka'?' · BROŃ POZ. '+g.wl:''),80);}
function muzzle(){const P=G_.P,M=META(P.anim);let lx,ly;if(P.anim==='jump'){lx=FW/2+18;ly=FW-36;}else{const q=M.muz[P.fr]||M.muz[0];lx=q[0];ly=q[1];}
  return{x:P.x+(lx-(FW/2-4))*P.face,y:P.y-(FW-1-ly)};}
function fire(){const g=G_,P=g.P,h=g.h;let dx=P.face,dy=0;
  if(P.anim==='up')dy=-1;else if(P.anim==='down')dy=1;else if(P.anim==='jump'){if(I.u)dy=-1;else if(I.d)dy=1;}
  const m=muzzle();let sx=m.x,sy=m.y;if(P.anim==='jump'&&dy!==0){sx=P.x+14*P.face;sy=dy<0?P.y-50:P.y-24;}
  const fury=g.ultT>0&&g.hero==='l';const wl=fury?3:g.wl;
  const base=Math.atan2(dy,dx);const add=(a,o)=>g.bullets.push(Object.assign({x:sx,y:sy,vx:Math.cos(a)*h.spd,vy:Math.sin(a)*h.spd,life:90,dmg:h.dmg,sc:1},o));
  if(g.hero==='b'){if(wl===1)add(base);else if(wl===2){const nx=-Math.sin(base)*3,ny=Math.cos(base)*3;add(base,{x:sx+nx,y:sy+ny});add(base,{x:sx-nx,y:sy-ny});}else[-.12,0,.12].forEach(d=>add(base+d));}
  else if(g.hero==='m'){add(base,{pierce:wl>=3});}
  else{if(wl===1)add(base);else if(wl===2)add(base,{dmg:h.dmg+1,sc:1.4});else[-.16,0,.16].forEach(d=>add(base+d,{dmg:h.dmg+.5,sc:1.2}));}
  P.flashT=3;beep(h.snd[0],h.snd[1],.06,.05,h.snd[2]);}
function spark(x,y,c){for(let i=0;i<4;i++)G_.parts.push({x,y,vx:(Math.random()-.5)*3,vy:(Math.random()-.5)*3,life:8+Math.random()*6,c,s:1});}
function boom(x,y,s){for(let i=0;i<10*s;i++){const a=Math.random()*6.28,v=Math.random()*2.2*s;G_.parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-.5,life:18+Math.random()*20,c:['#fff','#ffe066','#ff9a2e','#e0401e','#9aff5a'][Math.floor(Math.random()*5)],s:1+Math.floor(Math.random()*3)});}}
