'use strict';
/* Ładowanie grafik, typy wrogów, rozstawienie wrogów, statystyki bohaterów */
const W=640,H=360,G=280,FW=A.FW,GRAV=0.34;
const cv=document.getElementById('c'),ctx=cv.getContext('2d');ctx.imageSmoothingEnabled=false;
const img=s=>{const i=new Image();i.src=s;return i;};
const IM={far:img(A.far),wall:img(A.wall),tiles:img(A.tiles),plat:img(A.plat),boss:img(A.boss)};
const PR={};for(const k in A.props)PR[k]=img(A.props[k]);
const PU={};for(const k in A.pu)PU[k]=img(A.pu[k]);
const HS={};for(const k in A.heroes){HS[k]={};for(const n of ['idle','run','jump','shoot','up','down','hit','die'])HS[k][n]=img(A.heroes[k][n]);}
const BUL={};for(const k in A.bul)BUL[k]=img(A.bul[k]);
const UP={};for(const k in A.ult)UP[k]=img(A.ult[k].img);
const EN={};for(const k in A.enemies)EN[k]=img(A.enemies[k].img);
const BA={};for(const k in A.bossA)BA[k]=img(A.bossA[k].img);
const ET={rat:{walk:'szczur_run',hp:1.5,w:26,h:34,coins:1,ult:3,cd:10},robol:{walk:'robol_walk',atk:'robol_spit',hp:4,w:22,h:62,coins:2,ult:5,cd:10},
  barrel:{walk:'beczka_hop',hp:3,w:26,h:40,coins:2,ult:5,cd:15},kan:{walk:'kanalarz_walk',atk:'kanalarz_shoot',hp:14,w:36,h:78,coins:5,ult:12,cd:15}};
const SPAWN=[['rat',3450],['rat',3520],['barrel',3820],['barrel',3990,200],['barrel',4100],['rat',4150],['robol',4480,204],['barrel',4620],['barrel',4720],['rat',4800],['kan',5450],['robol',5600,196],['rat',5650],['robol',5800,146],['kan',5900],['rat',6200],['rat',6260],['robol',6420],['barrel',6520,196],['kan',6650],['rat',6700],['rat',6740],['robol',6780],['rat',450],['robol',700],['barrel',1100],['rat',1150],['rat',1300],['robol',1450],['barrel',1580],['kan',1980],['rat',2060],['rat',2200],['robol',2350],['barrel',2520],['kan',2790],['rat',2850]];
const HEROES={
 b:{name:'BADZIEJEK',weap:'Karabinek seryjny',c:'#ffd040',c2:'#5a4410',stats:[4,3,5],ult:'Flesz na mordę!',cd:6,spd:9,dmg:1.3,snd:[1100,380,'square']},
 m:{name:'MAREWIK',weap:'Ciężki karabin z taśmą',c:'#ff8a3a',c2:'#4a2410',stats:[3,5,3],ult:'No i pyk!',cd:10,spd:9.5,dmg:2,snd:[700,160,'square']},
 l:{name:'ŁYSA',weap:'Minigun plazmowy',c:'#ff5ad0',c2:'#4a1040',stats:[3,4,2],ult:'Gińcie parówczaki!',cd:9,spd:7.2,dmg:1.5,snd:[520,140,'sawtooth']}};
const ORDER=['b','m','l'];
