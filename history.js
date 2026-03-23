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


/* get all date docs inside attendance/uid */

const snap =
await getDocs(
collection(db,"attendance",uid,"")
).catch(()=>null);


/* fallback method */

const days = 31;

for(let i=0;i<days;i++){

const d = new Date();

d.setDate(d.getDate()-i);

const dateStr =
d.toISOString().split("T")[0];


const ref =
doc(
db,
"attendance",
uid,
dateStr,
"data"
);

const s =
await getDoc(ref);

if(!s.exists()) continue;


const t =
s.data().time;

let time = "-";

if(t?.seconds){

time =
new Date(
t.seconds*1000
).toLocaleTimeString([],{
hour12:true
});

}

table.innerHTML += `
<tr>
<td>${dateStr}</td>
<td>${time}</td>
</tr>
`;

}

}
