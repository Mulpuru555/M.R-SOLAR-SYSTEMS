// =========================
// FESTIVAL CONTROL
// =========================

const festivalTheme = "ramzan"; // ugadi / ramzan / none



if (festivalTheme === "ramzan") {

document.addEventListener("DOMContentLoaded", () => {


const isMobile = window.innerWidth < 768;



/* ========= BACKGROUND ========= */

document.body.style.background =
"linear-gradient(135deg,#0d1b2a,#1b4332,#081c15)";



/* ========= GOLD LINE ========= */

const gold=document.createElement("div");

gold.style.position="fixed";
gold.style.top="0";
gold.style.left="0";
gold.style.width="100%";
gold.style.height="4px";
gold.style.background=
"linear-gradient(90deg,gold,#ffd166,gold)";
gold.style.zIndex="9999";

document.body.appendChild(gold);



/* ========= MOON BAR ========= */

const topBar=document.createElement("div");

topBar.innerHTML="🌙 ⭐ Ramadan Mubarak 2026 ⭐ 🌙";

topBar.style.position="fixed";
topBar.style.top="4px";
topBar.style.width="100%";
topBar.style.textAlign="center";
topBar.style.fontSize=
isMobile ? "14px" : "16px";

topBar.style.background="#14532d";
topBar.style.color="gold";
topBar.style.zIndex="9999";

document.body.appendChild(topBar);



/* ========= WISH BANNER ========= */

const banner=document.createElement("div");

banner.innerHTML=
"Ramzan Mubarak 2026 | M.R Solar Systems wishes you peace & prosperity";

banner.style.position="fixed";
banner.style.top="28px";
banner.style.width="100%";
banner.style.background="#064e3b";
banner.style.color="white";
banner.style.textAlign="center";
banner.style.padding="6px";
banner.style.fontSize=
isMobile ? "12px" : "14px";

banner.style.zIndex="9999";

document.body.appendChild(banner);



/* ========= LIGHT PARTICLES ========= */

function particle(){

const p=document.createElement("div");

p.innerHTML="✨";

p.style.position="fixed";
p.style.top="-10px";
p.style.left=Math.random()*100+"vw";
p.style.fontSize=
isMobile ? "12px" : "14px";

p.style.color="gold";
p.style.zIndex="9999";

document.body.appendChild(p);

let fall=setInterval(()=>{

p.style.top=p.offsetTop+2+"px";

if(p.offsetTop>window.innerHeight){

p.remove();
clearInterval(fall);

}

},40);

}

setInterval(
particle,
isMobile ? 1500 : 900
);



/* ========= STAR EFFECT ========= */

function star(){

const s=document.createElement("div");

s.innerHTML="⭐";

s.style.position="fixed";
s.style.left=Math.random()*100+"vw";
s.style.top=Math.random()*100+"vh";
s.style.fontSize="12px";
s.style.color="gold";
s.style.zIndex="9999";

document.body.appendChild(s);

setTimeout(()=>s.remove(),1500);

}

setInterval(
star,
isMobile ? 2000 : 1200
);



/* ========= SMALL POPUP ========= */

setTimeout(()=>{

const pop=document.createElement("div");

pop.innerHTML=
"<b>Ramzan Mubarak 2026</b><br>M.R Solar Systems";

pop.style.position="fixed";
pop.style.bottom="20px";
pop.style.right="20px";
pop.style.background="white";
pop.style.padding="10px";
pop.style.boxShadow="0 0 10px black";
pop.style.zIndex="99999";

document.body.appendChild(pop);

setTimeout(()=>pop.remove(),4000);

},2000);



/* ========= MOON ICON ========= */

const moon=document.createElement("div");

moon.innerHTML="🌙";

moon.style.position="fixed";
moon.style.right="10px";
moon.style.top="60px";
moon.style.fontSize="28px";
moon.style.zIndex="9999";

document.body.appendChild(moon);



});
}
