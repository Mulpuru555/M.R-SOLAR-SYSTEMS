import { auth, db } from "./firebase-config.js";

import {
doc,
getDoc,
getDocs,
collection
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


let uid = "";


onAuthStateChanged(auth, async (user)=>{

if(!user) return;

uid = user.uid;

loadHistory();

});


async function loadHistory(){

const table =
document.getElementById("historyTable");

if(!table) return;

table.innerHTML = "";


/* get dates */

const userRef =
doc(db,"attendance",uid);

const datesSnap =
await getDocs(
collection(userRef)
);


for(const d of datesSnap.docs){

const date = d.id;

const dataRef =
doc(
db,
"attendance",
uid,
date,
"data"
);

const snap =
await getDoc(dataRef);

let time = "-";

if(snap.exists()){

const t =
snap.data().time;

if(t?.seconds){

time =
new Date(
t.seconds*1000
).toLocaleTimeString(
[],
{hour12:true}
);

}

}

table.insertAdjacentHTML(
"beforeend",
`
<tr>
<td>${date}</td>
<td>${time}</td>
</tr>
`
);

}

}
