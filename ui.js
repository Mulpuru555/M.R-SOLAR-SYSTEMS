let currentSection = null;


/* ================= LOADING ================= */

window.addEventListener("load", ()=>{

setTimeout(()=>{

const l =
document.getElementById("loadingScreen");

if(l) l.style.display="none";

},700);

});


/* ================= CLOCK ================= */

setInterval(()=>{

const c =
document.getElementById("liveClock");

if(!c) return;

const now = new Date();

let h =
now.getHours()
.toString()
.padStart(2,"0");

let m =
now.getMinutes()
.toString()
.padStart(2,"0");

let s =
now.getSeconds()
.toString()
.padStart(2,"0");

c.innerText =
h + ":" + m + ":" + s;

},1000);


/* ================= TOGGLE SECTION ================= */

window.toggleSection = (id)=>{

const target =
document.getElementById(id);

if(!target) return;


/* same → close */

if(currentSection === id){

target.style.display="none";
currentSection = null;
return;

}


/* close old */

if(currentSection){

const old =
document.getElementById(currentSection);

if(old)
old.style.display="none";

}


/* open */

target.style.display="block";

currentSection = id;

playClick();

};


/* ================= POPUP ================= */

window.closePopup = ()=>{

const p =
document.getElementById("editPopup");

if(p)
p.style.display="none";

};


window.openPopup = ()=>{

const p =
document.getElementById("editPopup");

if(p)
p.style.display="flex";

playClick();

};


/* ================= CLICK SOUND ================= */

const clickSound =
new Audio(
"https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg"
);

function playClick(){

try{
clickSound.currentTime = 0;
clickSound.play();
}catch(e){}

}


/* ================= BUTTON SOUND ================= */

document.addEventListener("click",(e)=>{

if(
e.target.tagName === "BUTTON" ||
e.target.classList.contains("card")
){
playClick();
}

});


/* ================= LOGOUT UI FALLBACK ================= */

const logoutBtn =
document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.onclick = ()=>{

location.href="index.html";

};

}
