// =========================
// FESTIVAL CONTROL
// =========================

const festivalTheme = "srirama";



if (festivalTheme === "srirama") {

document.addEventListener("DOMContentLoaded", () => {

const isMobile = window.innerWidth < 768;



/* ========= BACKGROUND ========= */

document.body.style.background =
"linear-gradient(135deg,#0b132b,#1c2541,#3a0ca3,#ffba08)";



/* ========= GOLD LINE ========= */

const gold=document.createElement("div");

gold.style.position="fixed";
gold.style.top="0";
gold.style.left="0";
gold.style.width="100%";
gold.style.height="4px";
gold.style.background=
"linear-gradient(90deg,gold,orange,gold)";
gold.style.zIndex="9999";

document.body.appendChild(gold);



/* ========= TOP BAR ========= */

const topBar=document.createElement("div");

topBar.innerHTML="🏹 Sri Rama Navami 2026 🏹";

topBar.style.position="fixed";
topBar.style.top="4px";
topBar.style.width="100%";
topBar.style.textAlign="center";
topBar.style.fontSize=
isMobile ? "14px" : "16px";

topBar.style.background="#ff6f00";
topBar.style.color="white";
topBar.style.zIndex="9999";

document.body.appendChild(topBar);



/* ========= BANNER ========= */

const banner=document.createElement("div");

banner.innerHTML=
"M.R Solar Systems wishes Happy Sri Rama Navami";

banner.style.position="fixed";
banner.style.top="28px";
banner.style.width="100%";
banner.style.background="#ff8f00";
banner.style.color="white";
banner.style.textAlign="center";
banner.style.padding="5px";
banner.style.fontSize=
isMobile ? "12px" : "14px";

banner.style.zIndex="9999";

document.body.appendChild(banner);



/* ========= WELCOME OVERLAY ========= */

const welcome=document.createElement("div");

welcome.innerHTML=
"<h1>🏹 Sri Rama Navami 🏹</h1>"+
"<h3>M.R Solar Systems</h3>"+
"<button id='enterSite'>Enter</button>";

welcome.style.position="fixed";
welcome.style.top="0";
welcome.style.left="0";
welcome.style.width="100%";
welcome.style.height="100%";
welcome.style.background="rgba(0,0,0,0.8)";
welcome.style.color="white";
welcome.style.display="flex";
welcome.style.flexDirection="column";
welcome.style.justifyContent="center";
welcome.style.alignItems="center";
welcome.style.zIndex="999999";

document.body.appendChild(welcome);

document.addEventListener("click",e=>{

if(e.target.id==="enterSite"){

welcome.remove();

}

});



/* ========= LIGHT PARTICLES ========= */

function light(){

const p=document.createElement("div");

p.innerHTML="✨";

p.style.position="fixed";
p.style.top="-10px";
p.style.left=Math.random()*100+"vw";
p.style.fontSize="14px";
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
light,
isMobile ? 1500 : 900
);



/* ========= DIYA ========= */

function diya(){

const d=document.createElement("div");

d.innerHTML="🪔";

d.style.position="fixed";
d.style.left=Math.random()*100+"vw";
d.style.top=Math.random()*100+"vh";
d.style.fontSize="18px";
d.style.zIndex="9999";

document.body.appendChild(d);

setTimeout(()=>d.remove(),2000);

}

setInterval(
diya,
isMobile ? 2500 : 1500
);



/* ========= BOW ========= */

function bow(){

const b=document.createElement("div");

b.innerHTML="🏹";

b.style.position="fixed";
b.style.left=Math.random()*100+"vw";
b.style.top=Math.random()*100+"vh";
b.style.fontSize="18px";
b.style.zIndex="9999";

document.body.appendChild(b);

setTimeout(()=>b.remove(),1500);

}

setInterval(
bow,
isMobile ? 3000 : 1800
);



/* ========= BELL SOUND ========= */

const audio=new Audio(
"https://actions.google.com/sounds/v1/bells/temple_bell.ogg"
);

setTimeout(()=>audio.play(),1500);



});
}
