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


/* get user doc */

const userRef =
doc(db,"attendance",uid);


/* get dates collection */

const datesSnap =
await getDocs(
collection(userRef)
);


for(const d of datesSnap.docs){

const date = d.id;


/* get data doc */

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

if(!snap.exists()) continue;

let time = "-";

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

table.innerHTML += `
<tr>
<td>${date}</td>
<td>${time}</td>
</tr>
`;

}

}
