'use strict';
/* Ekran tytułowy, menu, wybór bohatera */
/* ---------------- screens ---------------- */
let state='title';
const $=id=>document.getElementById(id);
$('select').style.backgroundImage=`url(${A.selbg})`;$('logo').src=A.logo;
let tstate='intro',msel=0;
const MENU=[{t:'START GRY',a:()=>showSelect()},{t:'GŁOŚNOŚĆ',vol:true,a:()=>{setVol(VOL>=10?0:VOL+1);renderMenu();}},{t:'STEROWANIE',a:()=>panel('ctrl')},{t:'AUTORZY',a:()=>panel('cred')}];
function renderMenu(){const m=$('menu');m.innerHTML='';MENU.forEach((it,i)=>{const d=document.createElement('div');d.className='it'+(i===msel?' sel':'');d.textContent=it.vol?('< '+it.t+' '+VOL+' >'):it.t;
  d.onpointerenter=()=>{if(tstate==='menu'&&msel!==i){msel=i;S.blip();renderMenu();}};d.onclick=()=>{if(tstate==='menu'){msel=i;S.ok();MENU[i].a();}};m.appendChild(d);});}
function panel(k){tstate='panel';const p=$('panel');
  p.innerHTML=(k==='ctrl'?'<h2>STEROWANIE</h2><table><tr><td>Strzałki / WASD</td><td>ruch i celowanie</td></tr><tr><td>↑ / ↓ + bieg</td><td>strzał po skosie</td></tr><tr><td>Z / K / Spacja</td><td>skok (↓ + skok: zeskok)</td></tr><tr><td>X / J</td><td>strzał</td></tr><tr><td>C / L</td><td>ult (gdy pasek pełny)</td></tr><tr><td>V / T</td><td>poza zwycięstwa (szpan)</td></tr><tr><td>← / → w pauzie</td><td>głośność</td></tr><tr><td>Enter / Esc</td><td>pauza</td></tr></table>'
   :'<h2>AUTORZY</h2>Pomysł, postaci i plansze: Nook<br>Kod i chiptune: Claude<br>Grafika: SpriteCook, Sorceress, Sprite Flow'
     +'<div class="thx"><b>Specjalne podziękowania</b> dla społeczności discordowego serwera <b>WUJASOWO</b> za inspirację. Konkretnie: BrS, Natalia, Błażejek, Maverick, Gucio, Blizzu, Loki, Sosna, Ghost Ripper, Miciia, Frostii, Swifty, Miodkova, Decooo, Barto, Makaronik. Jeśli kogoś nie wymieniłem z ksywki, to przepraszam.'
     +'<br><br>Oddzielne podziękowania dla mojej żony – <b>Ev</b>, która bezustannie wspiera mnie w działaniach.'
     +'<br><br>Jeśli choć raz zagraliście i bawiliście się dobrze, to kłaniam się Wam bardzo nisko.</div>')+'<div class="hint">Enter, Esc albo kliknij, żeby wrócić</div>';p.classList.add('on');}
$('panel').onclick=()=>{$('panel').classList.remove('on');tstate='menu';};
function showTitle(){state='title';$('title').classList.add('on');$('select').classList.remove('on');$('menu').classList.remove('on');$('press').style.display='block';tstate='intro';
  $('logo').classList.remove('in');setTimeout(()=>{$('logo').classList.add('in');},200);setTimeout(()=>{S.boom();tstate='press';},900);}
function pressStart(){tstate='menu';$('press').style.display='none';$('menu').classList.add('on');renderMenu();S.ok();}
$('title').addEventListener('click',e=>{au();if(tstate==='press')pressStart();});
// select
let ssel=0,slock=false;const idleCv=[];
ORDER.forEach((k,i)=>{const h=HEROES[k];const d=document.createElement('div');d.className='card';d.style.setProperty('--c',h.c);d.style.setProperty('--c2',h.c2);
  d.innerHTML=`<div class="frame"><img src="${A.por[k]}" alt="${h.name}"></div><div class="name">${h.name}</div><div class="weap">${h.weap}</div><div class="stats">${['SZYBKOŚĆ','SIŁA','TEMPO'].map((l,j)=>`<span>${l}</span><span class="bar">${[0,1,2,3,4].map(n=>`<i class="${n<h.stats[j]?'on':''}"></i>`).join('')}</span>`).join('')}</div><div class="ult">Ult: <b>${h.ult}</b></div><canvas class="idle" width="96" height="96"></canvas>`;
  d.onpointerenter=()=>{if(!slock&&ssel!==i){ssel=i;S.blip();renderSel();}};d.onclick=()=>{if(!slock){ssel=i;renderSel();pickHero();}};
  $('cards').appendChild(d);idleCv.push(d.querySelector('canvas'));});
function renderSel(){[...$('cards').children].forEach((c,i)=>c.classList.toggle('sel',i===ssel));}
function showSelect(){state='select';$('title').classList.remove('on');$('select').classList.add('on');renderSel();slock=false;}
function pickHero(){slock=true;S.ult();setTimeout(()=>{$('select').classList.remove('on');startGame(ORDER[ssel]);},700);}
function onKey(code){
  const ok=['Enter','Space','KeyZ','KeyX','KeyJ','KeyK'].includes(code);
  if(state==='title'){if(tstate==='press'&&ok)pressStart();else if(tstate==='menu'){if(code==='ArrowUp'||code==='KeyW'){msel=(msel+MENU.length-1)%MENU.length;S.blip();renderMenu();}else if(code==='ArrowDown'||code==='KeyS'){msel=(msel+1)%MENU.length;S.blip();renderMenu();}
      else if(MENU[msel].vol&&(code==='ArrowLeft'||code==='KeyA')){setVol(VOL-1);renderMenu();}else if(MENU[msel].vol&&(code==='ArrowRight'||code==='KeyD')){setVol(VOL+1);renderMenu();}else if(ok){S.ok();MENU[msel].a();}}
    else if(tstate==='panel'&&(ok||code==='Escape')){$('panel').classList.remove('on');tstate='menu';}}
  else if(state==='select'&&!slock){if(code==='ArrowLeft'||code==='KeyA'){ssel=(ssel+2)%3;S.blip();renderSel();}else if(code==='ArrowRight'||code==='KeyD'){ssel=(ssel+1)%3;S.blip();renderSel();}else if(ok)pickHero();else if(code==='Escape')showTitle();}
  else if(state==='pause'){if(code==='ArrowLeft'||code==='KeyA')setVol(VOL-1);else if(code==='ArrowRight'||code==='KeyD')setVol(VOL+1);}
  else if(state==='over'&&G_.t>60){if(ok)continueGame();else if(code==='Escape')showTitle();}
  else if(state==='win'&&(ok||code==='Escape')&&G_.t>60)showTitle();
}
