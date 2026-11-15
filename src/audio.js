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
   Utwory Nooka zapętlone co do próbki przez AudioBufferSourceNode.loop (pliki są przygotowane do pętli w całości).
   Tor: źródło -> wzmacniacz źródła (pojawianie/wyciszanie, przenikanie utworów) -> musDuckN (przyciszenie w pauzie itp.)
        -> musVolN (suwak MUZYKA, tylko .value) -> wyjście.
   MP3 ma opóźnienie kodera (~1105 próbek); jeśli przeglądarka go nie przycina, przesuwamy punkty pętli. */
const TRACKS={menu:{src:A.music,len:3894063/48000},piwnica:{src:A.musicLvl,len:7253021/48000},win:{src:A.musicWin,once:true}};
let musVolN=null,musDuckN=null,musSrc=null,musWant=null,musDuck=1,musJ=null,musPrev=null;
function mvolGain(){return .55*Math.pow(MVOL/10,1.6);}
function musInit(){if(!ac||musVolN)return;musVolN=ac.createGain();musVolN.gain.value=mvolGain();musVolN.connect(ac.destination);musDuckN=ac.createGain();musDuckN.gain.value=1;musDuckN.connect(musVolN);
  musLoad('menu');}
function musLoad(k){const T=TRACKS[k];if(T.buf||T.loading||!T.src)return;T.loading=true;
  fetch(T.src).then(r=>r.arrayBuffer()).then(b=>new Promise((ok,no)=>{const p=ac.decodeAudioData(b,ok,no);if(p&&p.catch)p.catch(no);})).then(buf=>{T.buf=buf;if(musWant===k&&(!musSrc||musSrc.k!==k))musPlay(k);}).catch(e=>console.warn('muzyka '+k+':',e));}
/* musPlay(k): przenika do utworu k; jeśli k już gra, nic nie robi */
function musPlay(k){k=k||'menu';musWant=k;if(!ac)return;musInit();if(musJ){musFadeOut(musJ,.4);musJ=null;}if(musSrc&&musSrc.k===k)return;const T=TRACKS[k];if(!T)return;if(!T.buf){musLoad(k);return;}
  musFadeOut(musSrc,.9);
  const s=ac.createBufferSource(),g=ac.createGain(),buf=T.buf;s.buffer=buf;const off=buf.duration>T.len+.012?1105/44100:0;s.loop=true;s.loopStart=off;s.loopEnd=Math.min(buf.duration,off+T.len);
  const t=ac.currentTime;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(1,t+1.2);s.connect(g);g.connect(musDuckN);s.start(t,off);musSrc={s,g,k};}
function musFadeOut(m,d){if(!m)return;const {s,g}=m,t=ac.currentTime;g.gain.cancelScheduledValues(t);g.gain.setValueAtTime(Math.max(.0001,g.gain.value),t);g.gain.exponentialRampToValueAtTime(.0001,t+d);try{s.stop(t+d+.05);}catch(e){}setTimeout(()=>{try{g.disconnect();}catch(e){}},(d+.3)*1000);}
/* dżingiel (jednorazowy): wycisza pętlę i gra raz */
function musJingle(k){if(!ac)return;musInit();const T=TRACKS[k];if(!T||!T.buf){musLoad(k);return;}musStop(.5);if(musJ)musFadeOut(musJ,.2);
  const s=ac.createBufferSource(),g=ac.createGain();s.buffer=T.buf;g.gain.value=1;s.connect(g);g.connect(musDuckN);s.start(ac.currentTime+.15);musJ={s,g};s.onended=()=>{if(musJ&&musJ.s===s)musJ=null;try{g.disconnect();}catch(e){}};}
function musStop(fade){musWant=null;if(!musSrc)return;musFadeOut(musSrc,fade==null?.8:fade);musSrc=null;}
/* co klatkę: przyciszenie zależne od stanu gry (pauza, game over, wygrana) */
function musTick(){if(typeof state==='undefined')return;if(state==='win'&&musPrev!=='win')musJingle('win');musPrev=state;if(!musDuckN)return;const d=state==='pause'?.35:state==='over'?.3:1;if(d!==musDuck){musDuck=d;const t=ac.currentTime;musDuckN.gain.cancelScheduledValues(t);musDuckN.gain.setTargetAtTime(Math.max(d,.0001),t,d===0?.6:.15);}}
function setMVol(v){MVOL=Math.max(0,Math.min(10,v));if(musVolN)musVolN.gain.value=mvolGain();try{localStorage.setItem('megarozwalka_mvol',MVOL);}catch(e){}}
