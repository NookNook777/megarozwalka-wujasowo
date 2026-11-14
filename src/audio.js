'use strict';
/* Syntezator efektów dźwiękowych (WebAudio) */
/* ---------------- audio ---------------- */
/* głośność 0–10, zapamiętana w przeglądarce; wszystkie dźwięki idą przez jeden wzmacniacz (master) */
let VOL=7;try{const v=localStorage.getItem('megarozwalka_vol');if(v!==null&&!isNaN(+v))VOL=Math.max(0,Math.min(10,+v));}catch(e){}
let ac=null,master=null;
function volGain(){return Math.pow(VOL/10,1.6);}
function au(){if(!ac){const C=window.AudioContext||window.webkitAudioContext;if(C){ac=new C();master=ac.createGain();master.gain.value=volGain();master.connect(OUT());}}if(ac&&ac.state==='suspended')ac.resume();}
function OUT(){return master||ac.destination;}
function setVol(v){VOL=Math.max(0,Math.min(10,v));if(master)master.gain.setTargetAtTime(volGain(),ac.currentTime,.02);try{localStorage.setItem('megarozwalka_vol',VOL);}catch(e){}beep(880,null,.05,.06);}
function volBar(){return '▮'.repeat(VOL)+'▯'.repeat(10-VOL);}
function beep(f0,f1,d,v,type){if(!ac)return;const t=ac.currentTime,o=ac.createOscillator(),g=ac.createGain();o.type=type||'square';o.frequency.setValueAtTime(f0,t);if(f1)o.frequency.exponentialRampToValueAtTime(f1,t+d);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(OUT());o.start(t);o.stop(t+d+.02);}
function noise(d,v,f0,f1){if(!ac)return;const t=ac.currentTime,n=Math.floor(ac.sampleRate*d),b=ac.createBuffer(1,n,ac.sampleRate),x=b.getChannelData(0);for(let i=0;i<n;i++)x[i]=(Math.random()*2-1)*(1-i/n);
  const s=ac.createBufferSource(),f=ac.createBiquadFilter(),g=ac.createGain();s.buffer=b;f.type='lowpass';f.frequency.setValueAtTime(f0,t);f.frequency.exponentialRampToValueAtTime(f1,t+d);g.gain.value=v;s.connect(f);f.connect(g);g.connect(OUT());s.start(t);}
const S={blip:()=>beep(880,null,.05,.06),ok:()=>{beep(660,null,.07,.09);setTimeout(()=>beep(990,null,.1,.09),70);},
  boom:()=>noise(.4,.35,2500,80),big:()=>{noise(.9,.5,1600,40);beep(110,25,.8,.35,'triangle');},jump:()=>beep(260,620,.1,.07),
  pick:()=>[523,659,784,1047].forEach((f,i)=>setTimeout(()=>beep(f,null,.07,.07),i*50)),hurt:()=>{beep(600,60,.5,.12);noise(.25,.2,1500,100);},
  coin:()=>{beep(988,null,.05,.05);setTimeout(()=>beep(1319,null,.08,.05),50);},ult:()=>[392,523,659,784,1047,1319].forEach((f,i)=>setTimeout(()=>beep(f,null,.09,.08),i*55))};
