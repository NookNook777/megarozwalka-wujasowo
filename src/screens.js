'use strict';
/* Ekran tytułowy, menu, wybór bohatera */
/* ---------------- screens ---------------- */
let state='title';
const $=id=>document.getElementById(id);
$('select').style.backgroundImage=`url(${A.selbg})`;$('logo').src=A.logo;
let tstate='intro',msel=0,psel=0;
/* suwaki głośności: 'm' = muzyka, 's' = efekty */
function volGet(k){return k==='m'?MVOL:VOL;}function volStep(k,d){if(k==='m')setMVol(MVOL+d);else setVol(VOL+d);}
const MENU=[{t:'START GRY',a:()=>showSelect()},{t:'MUZYKA',vol:'m',a:()=>{volStep('m',MVOL>=10?-MVOL:1);renderMenu();}},{t:'EFEKTY',vol:'s',a:()=>{volStep('s',VOL>=10?-VOL:1);renderMenu();}},{t:'STEROWANIE',a:()=>panel('ctrl')},{t:'AUTORZY',a:()=>panel('cred')}];
/* menu budowane raz; przy zmianach tylko aktualizujemy klasy i tekst (wcześniej przebudowa DOM gubiła kliknięcia) */
function renderMenu(){const m=$('menu');
  if(m.children.length!==MENU.length){m.innerHTML='';MENU.forEach((it,i)=>{const d=document.createElement('div');
    d.onpointerenter=()=>{if(tstate==='menu'&&msel!==i){msel=i;S.blip();renderMenu();}};
    d.onclick=e=>{if(tstate!=='menu')return;msel=i;if(it.vol){const r=d.getBoundingClientRect();volStep(it.vol,(e.clientX-r.left)<r.width/2?-1:1);renderMenu();return;}S.ok();it.a();};
    m.appendChild(d);});}
  MENU.forEach((it,i)=>{const d=m.children[i];d.className='it'+(i===msel?' sel':'');const t=it.vol?('< '+it.t+' '+String(volGet(it.vol)).padStart(2,' ')+' >'):it.t;if(d.textContent!==t)d.textContent=t;});}
/* ---- ekran STEROWANIE: zmiana klawiszy ---- */
let PANELK='',csel=0;
const CTRL=[['l','W lewo'],['r','W prawo'],['u','Góra / celowanie w górę'],['d','Dół / zeskok z platformy'],['j','Skok'],['f','Strzał'],['x','Ult'],['v','Szpan (poza zwycięstwa)']];
function keyName(c){if(!c)return '—';const M={ArrowLeft:'STRZ. LEWO',ArrowRight:'STRZ. PRAWO',ArrowUp:'STRZ. GÓRA',ArrowDown:'STRZ. DÓŁ',Space:'SPACJA',ShiftLeft:'L-SHIFT',ShiftRight:'P-SHIFT',ControlLeft:'L-CTRL',ControlRight:'P-CTRL',AltLeft:'L-ALT',AltRight:'P-ALT',Tab:'TAB',Backspace:'BACKSPACE',CapsLock:'CAPS'};
  return M[c]||c.replace(/^Key/,'').replace(/^Digit/,'').replace(/^Numpad/,'NUM ').toUpperCase();}
function renderCtrl(msg){const p=$('panel');const n=CTRL.length*2;
  p.innerHTML='<h2>STEROWANIE</h2><table class="kt">'+CTRL.map(([a,l],r)=>'<tr><td>'+l+'</td>'+[0,1].map(sl=>{const i=r*2+sl,w=REB&&REB.a===a&&REB.slot===sl;return '<td><span class="kc'+(i===csel?' sel':'')+(w?' wait':'')+'" data-i="'+i+'">'+(w?'naciśnij…':keyName(BIND[a][sl]))+'</span></td>';}).join('')+'</tr>').join('')+'</table>'
   +'<div class="kfix">Spacja zawsze skacze · Enter / Esc / P: pauza · strzałki lewo/prawo w pauzie: głośność</div>'
   +'<div class="kbtn"><span class="kc'+(csel===n?' sel':'')+'" data-i="'+n+'">PRZYWRÓĆ DOMYŚLNE</span> <span class="kc'+(csel===n+1?' sel':'')+'" data-i="'+(n+1)+'">WRÓĆ</span></div>'
   +'<div class="hint">'+(msg||'Wybierz pole i naciśnij Enter (albo kliknij), potem nowy klawisz. Esc: anuluj / wróć')+'</div>';
  p.querySelectorAll('.kc').forEach(el=>{el.onclick=e=>{e.stopPropagation();if(REB)return;csel=+el.dataset.i;ctrlAct();};});}
function ctrlAct(){const n=CTRL.length*2;if(csel<n){REB={a:CTRL[csel>>1][0],slot:csel&1};S.blip();renderCtrl();}else if(csel===n){BIND=JSON.parse(JSON.stringify(BIND_DEF));saveBind();S.ok();renderCtrl('Przywrócono domyślne klawisze');}else closePanel();}
function rebindKey(code){const r=REB;REB=null;if(code==='Escape'){renderCtrl('Anulowano');return;}
  if(BIND_RES.includes(code)){beep(200,120,.12,.08);renderCtrl(keyName(code)+' jest zarezerwowany (pauza / skok) — wybierz inny');return;}
  for(const a in BIND)for(let sl=0;sl<2;sl++)if(BIND[a][sl]===code)BIND[a][sl]=null;// klawisz może mieć tylko jedną akcję
  BIND[r.a][r.slot]=code;saveBind();S.ok();renderCtrl();}
function closePanel(){$('panel').classList.remove('on');tstate='menu';PANELK='';REB=null;}
function ctrlKey(code){const n=CTRL.length*2;
  if(code==='Escape'){closePanel();return;}
  if(code==='ArrowDown'||code==='KeyS'){csel=csel<n-2?csel+2:csel<n?n:csel;S.blip();renderCtrl();}
  else if(code==='ArrowUp'||code==='KeyW'){csel=csel>=n?n-2:Math.max(0,csel-2);S.blip();renderCtrl();}
  else if(code==='ArrowLeft'||code==='KeyA'){if(csel>=n)csel=n;else csel&=~1;S.blip();renderCtrl();}
  else if(code==='ArrowRight'||code==='KeyD'){if(csel>=n)csel=n+1;else csel|=1;S.blip();renderCtrl();}
  else if(code==='Enter'||code==='Space')ctrlAct();}
function panel(k){tstate='panel';const p=$('panel');
  if(k==='ctrl'){PANELK='ctrl';csel=0;renderCtrl();p.classList.add('on');return;}PANELK=k;
  p.innerHTML=('<h2>AUTORZY</h2>Pomysł, postaci i plansze: Nook<br>Muzyka: Nook (Suno)<br>Kod i efekty dźwiękowe: Claude<br>Grafika: SpriteCook, Sorceress, Sprite Flow'
     +'<div class="thx"><b>Specjalne podziękowania</b> dla społeczności discordowego serwera <b>WUJASOWO</b> za inspirację. Konkretnie: BrS, Natalia, Błażejek, Maverick, Gucio, Blizzu, Loki, Sosna, Ghost Ripper, Miciia, Frostii, Swifty, Miodkova, Decooo, Barto, Makaronik. Jeśli kogoś nie wymieniłem z ksywki, to przepraszam.'
     +'<br><br>Oddzielne podziękowania dla mojej żony – <b>Ev</b>, która bezustannie wspiera mnie w działaniach.'
     +'<br><br>Jeśli choć raz zagraliście i bawiliście się dobrze, to kłaniam się Wam bardzo nisko.</div>')+'<div class="hint">Enter, Esc albo kliknij, żeby wrócić</div>';p.classList.add('on');}
$('panel').onclick=()=>{if(PANELK==='ctrl')return;closePanel();};
function showTitle(){if(typeof beamStop==='function')beamStop();state='title';$('title').classList.add('on');$('select').classList.remove('on');$('menu').classList.remove('on');$('press').style.display='block';tstate='intro';if(ac)musPlay('menu');
  $('logo').classList.remove('in');setTimeout(()=>{$('logo').classList.add('in');},200);setTimeout(()=>{S.boom();tstate='press';},900);}
function pressStart(){musPlay('menu');tstate='menu';$('press').style.display='none';$('menu').classList.add('on');renderMenu();S.ok();}
$('title').addEventListener('click',e=>{au();if(tstate==='press')pressStart();});
// select
let ssel=0,slock=false;const idleCv=[];
ORDER.forEach((k,i)=>{const h=HEROES[k];const d=document.createElement('div');d.className='card';d.style.setProperty('--c',h.c);d.style.setProperty('--c2',h.c2);
  d.innerHTML=`<div class="frame"><img src="${A.por[k]}" alt="${h.name}"></div><div class="name">${h.name}</div><div class="weap">${h.weap}</div><div class="stats">${['SZYBKOŚĆ','SIŁA','TEMPO'].map((l,j)=>`<span>${l}</span><span class="bar">${[0,1,2,3,4].map(n=>`<i class="${n<h.stats[j]?'on':''}"></i>`).join('')}</span>`).join('')}</div><div class="ult">Ult: <b>${h.ult}</b></div><canvas class="idle" width="96" height="96"></canvas>`;
  d.onpointerenter=()=>{if(!slock&&ssel!==i){ssel=i;S.blip();renderSel();}};d.onclick=()=>{if(!slock){ssel=i;renderSel();pickHero();}};
  $('cards').appendChild(d);idleCv.push(d.querySelector('canvas'));});
function renderSel(){[...$('cards').children].forEach((c,i)=>c.classList.toggle('sel',i===ssel));}
function showSelect(){if(ac){musInit();musLoad('piwnica');musLoad('win');musLoad('over');}state='select';$('title').classList.remove('on');$('select').classList.add('on');renderSel();slock=false;}
function pickHero(){slock=true;S.ult();setTimeout(()=>{$('select').classList.remove('on');startGame(ORDER[ssel]);},700);}
function onKey(code){
  const ok=['Enter','Space','KeyZ','KeyX','KeyJ','KeyK'].includes(code);
  if(state==='title'&&code==='KeyF'){cyclePreview();S.ok();}
  if(state==='title'){if(tstate==='press'&&ok)pressStart();else if(tstate==='menu'){if(code==='ArrowUp'||code==='KeyW'){msel=(msel+MENU.length-1)%MENU.length;S.blip();renderMenu();}else if(code==='ArrowDown'||code==='KeyS'){msel=(msel+1)%MENU.length;S.blip();renderMenu();}
      else if(MENU[msel].vol&&(code==='ArrowLeft'||code==='KeyA')){volStep(MENU[msel].vol,-1);renderMenu();}else if(MENU[msel].vol&&(code==='ArrowRight'||code==='KeyD')){volStep(MENU[msel].vol,1);renderMenu();}else if(ok){S.ok();MENU[msel].a();}}
    else if(tstate==='panel'){if(PANELK==='ctrl')ctrlKey(code);else if(ok||code==='Escape')closePanel();}}
  else if(state==='select'&&!slock){if(code==='ArrowLeft'||code==='KeyA'){ssel=(ssel+2)%3;S.blip();renderSel();}else if(code==='ArrowRight'||code==='KeyD'){ssel=(ssel+1)%3;S.blip();renderSel();}else if(ok)pickHero();else if(code==='Escape')showTitle();}
  else if(state==='pause'){if(code==='ArrowUp'||code==='KeyW'||code==='ArrowDown'||code==='KeyS'){psel=1-psel;S.blip();}else if(code==='ArrowLeft'||code==='KeyA')volStep(psel?'s':'m',-1);else if(code==='ArrowRight'||code==='KeyD')volStep(psel?'s':'m',1);}
  else if(state==='over'&&G_.t>60){if(ok)continueGame();else if(code==='Escape')showTitle();}
  else if(state==='win'&&(ok||code==='Escape')&&G_.t>60)showTitle();
}
