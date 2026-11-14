'use strict';
/* Pętla gry, sterowanie dotykowe, start */
/* ---------------- loop ---------------- */
let st=0,acc=0,last=performance.now();
function frame(now){acc+=Math.min(100,now-last);last=now;
  while(acc>=1000/60){acc-=1000/60;st++;
    if(state==='play'||state==='pause'||state==='win'||state==='over'||state==='ultcut'){update();}
    else poll();
    if(state==='select'){idleCv.forEach((c,i)=>{if(st%2)return;const k=ORDER[i],g2=c.getContext('2d'),o=A.heroes[k].meta.idle.order,sp=i===ssel?5:8,f=o[Math.floor(st/2/sp)%o.length];g2.imageSmoothingEnabled=false;g2.clearRect(0,0,96,96);if(HS[k].idle.complete)g2.drawImage(HS[k].idle,f*96,0,96,96,0,0,96,96);});}}
  draw();requestAnimationFrame(frame);}
(function(){const coarse=(matchMedia&&matchMedia('(pointer: coarse)').matches)||('ontouchstart' in window);if(!coarse)return;$('touch').hidden=false;
  const stk=$('stick'),kn=$('knob');let id=null;
  const set=(dx,dy)=>{T.l=dx<-14?1:0;T.r=dx>14?1:0;T.u=dy<-16?1:0;T.d=dy>16?1:0;const m=Math.min(1,40/Math.max(1,Math.hypot(dx,dy)));kn.style.transform=`translate(${dx*m}px,${dy*m}px)`;};
  const pos=e=>{const r=stk.getBoundingClientRect();return[e.clientX-r.left-r.width/2,e.clientY-r.top-r.height/2];};
  stk.addEventListener('pointerdown',e=>{id=e.pointerId;stk.setPointerCapture(id);au();set(...pos(e));});stk.addEventListener('pointermove',e=>{if(e.pointerId===id)set(...pos(e));});
  const end=e=>{if(e.pointerId===id){id=null;set(0,0);}};stk.addEventListener('pointerup',end);stk.addEventListener('pointercancel',end);
  const btn=(el,k,tk)=>{el.addEventListener('pointerdown',e=>{e.preventDefault();el.setPointerCapture(e.pointerId);au();T[k]=1;if(tk)T[tk]=1;el.classList.add('on');});const up=()=>{T[k]=0;el.classList.remove('on');};el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);};
  btn($('bJ'),'j','tj');btn($('bF'),'f');btn($('bU'),'x','tx');$('bP').addEventListener('pointerdown',e=>{e.preventDefault();T.tp=1;});})();
(document.fonts&&document.fonts.load?Promise.all([document.fonts.load('8px "Press Start 2P"'),document.fonts.load('16px "Press Start 2P"')]).catch(()=>{}):Promise.resolve()).finally(()=>{});
showTitle();requestAnimationFrame(frame);
