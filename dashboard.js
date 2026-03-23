import { auth, db } from "./firebase-config.js";

import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


let uid = "";
let userData = null;


/* ================= AUTH ================= */

onAuthStateChanged(auth, async (user)=>{

if(!user){

location.href = "index.html";
return;

}

uid = user.uid;


/* get user */

const snap = await getDoc(
doc(db,"users",uid)
);

if(!snap.exists()){

location.href="index.html";
return;

}

userData = snap.data();


/* blocked check */

if(userData.accountStatus === "blocked"){

showBlocked();
return;

}


/* welcome name */

const w = document.getElementById("welcomeName");

if(w){

w.innerText = "Welcome " + (userData.name || "");

}


/* load notice later */
/* load stats later */
/* attendance later */
/* erp later */

});



/* ================= BLOCKED ================= */

function showBlocked(){

document.body.innerHTML = `

<div style="
height:100vh;
display:flex;
justify-content:center;
align-items:center;
background:black;
color:white;
">

<div style="
background:#111;
padding:40px;
border:2px solid red;
border-radius:10px;
text-align:center;
">

<h2>ACCOUNT BLOCKED</h2>

<button id="logoutBtn2">
Logout
</button>

</div>

</div>

`;

document.getElementById("logoutBtn2").onclick = async ()=>{

await signOut(auth);
location.href="index.html";

};

}



/* ================= LOGOUT ================= */

const logoutBtn = document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.onclick = async ()=>{

await signOut(auth);
location.href="index.html";

};

}
