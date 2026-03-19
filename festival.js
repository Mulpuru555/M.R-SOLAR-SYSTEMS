// =====================================
// FESTIVAL CONTROL
// =====================================

const festivalTheme = "ugadi"; // change to none after festival



if (festivalTheme === "ugadi") {

document.addEventListener("DOMContentLoaded", () => {



/* ========= BACKGROUND ========= */

document.body.style.background =
"linear-gradient(135deg,#fff8e1,#ffe0b2,#fff3e0,#fffde7)";



/* ========= GOLD BORDER ========= */

const gold=document.createElement("div");

gold.style.position="fixed";
gold.style.top="0";
gold.style.left="0";
gold.style.width="100%";
gold.style.height="6px";
gold.style.background=
"linear-gradient(90deg,gold,orange,gold)";
gold.style.zIndex="99999";

document.body.appendChild(gold);



/* ========= MANGO LEAVES ========= */

const leaves=document.createElement("div");

leaves.innerHTML=
"🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿";

leaves.style.position="fixed";
leaves.style.top="6px";
leaves.style.width="100%";
leaves.style.textAlign="center";
leaves.style.fontSize="26px";
leaves.style.background="#2e7d32";
leaves.style.color="white";
leaves.style.zIndex="99999";

document.body.appendChild(leaves);



/* ========= OFFER BANNER ========= */

const banner=document.createElement("div");

banner.innerHTML=
"🌸 HAPPY UGADI 🌸 | Special Solar Offers ☀️ | Call 9154777773";

banner.style.position="fixed";
banner.style.top="40px";
banner.style.width="100%";
banner.style.background=
"linear-gradient(90deg,#ff9800,#ff5722)";
banner.style.color="white";
banner.style.textAlign="center";
banner.style.padding="10px";
banner.style.fontWeight="bold";
banner.style.zIndex="99999";

document.body.appendChild(banner);



/* ========= FULL SCREEN WELCOME ========= */

const welcome=document.createElement("div");

welcome.innerHTML=
"<h1>🌸 Happy Ugadi 🌸</h1>"+
"<h2>M.R Solar Systems</h2>"+
"<p>Bright & Prosperous New Year</p>"+
"<button id='enterSite'>Enter Website</button>";

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



/* ========= FLOWERS ========= */

function flower(){

const f=document.createElement("div");

f.innerHTML="🌸";

f.style.position="fixed";
f.style.top="-10px";
f.style.left=Math.random()*100+"vw";
f.style.fontSize="20px";
f.style.zIndex="99999";

document.body.appendChild(f);

let fall=setInterval(()=>{

f.style.top=f.offsetTop+3+"px";

if(f.offsetTop>window.innerHeight){

f.remove();
clearInterval(fall);

}

},20);

}

setInterval(flower,250);



/* ========= CONFETTI ========= */

function confetti(){

const c=document.createElement("div");

c.innerHTML="✨";

c.style.position="fixed";
c.style.top="-10px";
c.style.left=Math.random()*100+"vw";
c.style.fontSize="18px";
c.style.zIndex="99999";

document.body.appendChild(c);

let fall=setInterval(()=>{

c.style.top=c.offsetTop+4+"px";

if(c.offsetTop>window.innerHeight){

c.remove();
clearInterval(fall);

}

},20);

}

setInterval(confetti,400);



/* ========= FIREWORK ========= */

function fire(){

const f=document.createElement("div");

f.innerHTML="🎆";

f.style.position="fixed";
f.style.left=Math.random()*100+"vw";
f.style.top=Math.random()*100+"vh";
f.style.fontSize="25px";
f.style.zIndex="99999";

document.body.appendChild(f);

setTimeout(()=>f.remove(),800);

}

setInterval(fire,1200);



/* ========= RANGOLI ========= */

const rangoli=document.createElement("div");

rangoli.innerHTML=
"🏵🏵🏵🏵🏵🏵🏵🏵🏵🏵🏵🏵";

rangoli.style.position="fixed";
rangoli.style.bottom="0";
rangoli.style.width="100%";
rangoli.style.textAlign="center";
rangoli.style.fontSize="24px";
rangoli.style.background="#ffcc80";
rangoli.style.zIndex="99999";

document.body.appendChild(rangoli);



/* ========= SOUND ========= */

const audio=new Audio(
"https://actions.google.com/sounds/v1/bells/temple_bell.ogg"
);

setTimeout(()=>audio.play(),1500);



/* ========= LOGO GLOW ========= */

const logo=document.querySelector("img");

if(logo){

logo.style.boxShadow=
"0 0 20px gold";

}



});
}
