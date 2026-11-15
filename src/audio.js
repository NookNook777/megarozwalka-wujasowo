'use strict';
/* Syntezator efektów dźwiękowych (WebAudio) */
/* ---------------- audio ---------------- */
/* głośność 0–10, zapamiętana w przeglądarce; wszystkie dźwięki idą przez jeden wzmacniacz (master) */
let VOL=7;try{const v=localStorage.getItem('megarozwalka_vol');if(v!==null&&!isNaN(+v))VOL=Math.max(0,Math.min(10,+v));}catch(e){}
let MVOL=6;try{const v=localStorage.getItem('megarozwalka_mvol');if(v!==null&&!isNaN(+v))MVOL=Math.max(0,Math.min(10,+v));}catch(e){}
let ac=null,master=null;
function volGain(){return Math.pow(VOL/10,1.6);}
function au(){if(!ac){const C=window.AudioContext||window.webkitAudioContext;if(C){ac=new C();master=ac.createGain();master.gain.value=volGain();master.connect(ac.destination);}}if(ac&&ac.state==='suspended')ac.resume();musInit();}
function OUT(){return master||ac.destination;}
/* zmiana głośności: zamiast automatyki parametru (różnie działa w przeglądarkach) tworzymy nowy wzmacniacz z gotową wartością,
   a stary odłączamy po chwili; dodatkowo beep/noise skalują swoją głośność od razu przy tworzeniu */
function setVol(v){VOL=Math.max(0,Math.min(10,v));if(ac){const old=master;master=ac.createGain();master.gain.value=volGain();master.connect(ac.destination);if(old)setTimeout(()=>{try{old.disconnect();}catch(e){}},1500);}try{localStorage.setItem('megarozwalka_vol',VOL);}catch(e){}beep(880,null,.05,.06);}
function volBar(){return '▮'.repeat(VOL)+'▯'.repeat(10-VOL);}
function beep(f0,f1,d,v,type){if(!ac)return;const t=ac.currentTime,o=ac.createOscillator(),g=ac.createGain();o.type=type||'square';o.frequency.setValueAtTime(f0,t);if(f1)o.frequency.exponentialRampToValueAtTime(f1,t+d);const vv=Math.max(.0002,v*volGain());g.gain.setValueAtTime(vv,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(ac.destination);o.start(t);o.stop(t+d+.02);}
function noise(d,v,f0,f1){if(!ac)return;const t=ac.currentTime,n=Math.floor(ac.sampleRate*d),b=ac.createBuffer(1,n,ac.sampleRate),x=b.getChannelData(0);for(let i=0;i<n;i++)x[i]=(Math.random()*2-1)*(1-i/n);
  const s=ac.createBufferSource(),f=ac.createBiquadFilter(),g=ac.createGain();s.buffer=b;f.type='lowpass';f.frequency.setValueAtTime(f0,t);f.frequency.exponentialRampToValueAtTime(f1,t+d);g.gain.value=v*volGain();s.connect(f);f.connect(g);g.connect(ac.destination);s.start(t);}
const S={blip:()=>beep(880,null,.05,.06),ok:()=>{beep(660,null,.07,.09);setTimeout(()=>beep(990,null,.1,.09),70);},
  boom:()=>noise(.4,.35,2500,80),big:()=>{noise(.9,.5,1600,40);beep(110,25,.8,.35,'triangle');},jump:()=>beep(260,620,.1,.07),
  pick:()=>[523,659,784,1047].forEach((f,i)=>setTimeout(()=>beep(f,null,.07,.07),i*50)),hurt:()=>{beep(600,60,.5,.12);noise(.25,.2,1500,100);},
  coin:()=>{beep(988,null,.05,.05);setTimeout(()=>beep(1319,null,.08,.05),50);},ult:()=>[392,523,659,784,1047,1319].forEach((f,i)=>setTimeout(()=>beep(f,null,.09,.08),i*55))};

/* ---------------- muzyka ----------------
   Główny motyw (Suno, Nook) zapętlony co do próbki przez AudioBufferSourceNode.loop.
   Tor: źródło -> własny wzmacniacz źródła (pojawianie/wyciszanie, automatyka) -> musVolN (suwak MUZYKA, tylko .value) -> wyjście.
   MP3 ma opóźnienie kodera (~1105 próbek); jeśli przeglądarka go nie przycina, przesuwamy punkty pętli. */
const MUS_LEN=3894063/48000;
let musBuf=null,musSrc=null,musFade=null,musVolN=null,musWant=false,musLoading=false;
function mvolGain(){return .55*Math.pow(MVOL/10,1.6);}
function musInit(){if(!ac||musFade)return;musVolN=ac.createGain();musVolN.gain.value=mvolGain();musVolN.connect(ac.destination);musFade=true;
  if(musLoading||!A.music)return;musLoading=true;
  fetch(A.music).then(r=>r.arrayBuffer()).then(b=>new Promise((ok,no)=>{const p=ac.decodeAudioData(b,ok,no);if(p&&p.catch)p.catch(no);})).then(buf=>{musBuf=buf;if(musWant)musPlay();}).catch(e=>console.warn('muzyka:',e));}
function musPlay(){musWant=true;if(!ac)return;musInit();if(!musBuf||musSrc)return;
  const s=ac.createBufferSource(),g=ac.createGain();s.buffer=musBuf;const off=musBuf.duration>MUS_LEN+.012?1105/44100:0;s.loop=true;s.loopStart=off;s.loopEnd=Math.min(musBuf.duration,off+MUS_LEN);
  const t=ac.currentTime;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(1,t+1.2);s.connect(g);g.connect(musVolN);s.start(t,off);musSrc={s,g};}
function musStop(fade){musWant=false;if(!musSrc)return;const {s,g}=musSrc,t=ac.currentTime,d=fade==null?.8:fade;musSrc=null;
  g.gain.cancelScheduledValues(t);g.gain.setValueAtTime(Math.max(.0001,g.gain.value),t);g.gain.exponentialRampToValueAtTime(.0001,t+d);try{s.stop(t+d+.05);}catch(e){}setTimeout(()=>{try{g.disconnect();}catch(e){}},(d+.3)*1000);}
function setMVol(v){MVOL=Math.max(0,Math.min(10,v));if(musVolN)musVolN.gain.value=mvolGain();try{localStorage.setItem('megarozwalka_mvol',MVOL);}catch(e){}}
