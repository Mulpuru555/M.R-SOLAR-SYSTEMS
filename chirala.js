import { auth, db } from "./firebase-config.js";

import {
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
collection,
getDocs,
query,
where,
doc,
updateDoc,
getDoc,
setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const attendanceBody =
document.getElementById("attendanceTable");

const blockedBody =
document.getElementById("blockedTable");

const summaryBody =
document.getElementById("summaryTable");

const dateInput =
document.getElementById("attendanceDate");



onAuthStateChanged(auth,(user)=>{

if(!user){
window.location.href="index.html";
}

});


window.logoutUser = async function(){

await signOut(auth);
window.location.href="index.html";

};



function getLocalDateString(dateObj){

return dateObj.getFullYear()+"-"+

String(dateObj.getMonth()+1).padStart(2,"0")+"-"+

String(dateObj.getDate()).padStart(2,"0");

}


const today =
getLocalDateString(new Date());

dateInput.value=today;



async function isHoliday(date){

const d=new Date(date);

if(d.getDay()==0) return true;

const snap=await getDoc(
doc(db,"settings","holidays","holidayList",date)
);

return snap.exists();

}



/* ATTENDANCE */

async function loadAttendance(date){

attendanceBody.innerHTML="";

const holiday=await isHoliday(date);

const usersSnapshot=await getDocs(
query(collection(db,"users"),
where("role","==","employee"))
);

const attendanceSnapshot=
await getDocs(collection(db,"attendance"));

const map={};

attendanceSnapshot.forEach(docSnap=>{

const data=docSnap.data();

if(data.date===date){
map[data.employeeId]=data;
}

});


usersSnapshot.forEach(docSnap=>{

const user=docSnap.data();

let status;
let time="-";

if(holiday){

status="<span class='holiday'>Holiday</span>";

}
else if(map[docSnap.id]){

status="<span class='present'>Present</span>";

const t=map[docSnap.id].timestamp;

if(t?.seconds){

time=new Date(
t.seconds*1000
).toLocaleTimeString("en-IN");

}

}
else{

status="<span class='absent'>Absent</span>";

}


const row=document.createElement("tr");

row.innerHTML=`

<td>${user.name}</td>

<td>${status}</td>

<td>${time}</td>

`;

attendanceBody.appendChild(row);

});


}



/* SUMMARY */

async function loadSummary(){

summaryBody.innerHTML="";

const usersSnapshot=await getDocs(
query(collection(db,"users"),
where("role","==","employee"))
);

const attendanceSnapshot=
await getDocs(collection(db,"attendance"));

const todayDate=new Date();

const start=new Date(
todayDate.getFullYear(),
todayDate.getMonth(),
1
);

let workingDays=0;

for(
let d=new Date(start);
d<=todayDate;
d.setDate(d.getDate()+1)
){

if(d.getDay()==0) continue;

workingDays++;

}


const presentMap={};

attendanceSnapshot.forEach(docSnap=>{

const data=docSnap.data();

presentMap[data.employeeId] =
(presentMap[data.employeeId]||0)+1;

});


usersSnapshot.forEach(docSnap=>{

const user=docSnap.data();

const present=
presentMap[docSnap.id]||0;

const absent=
workingDays-present;

const row=document.createElement("tr");

row.innerHTML=`

<td>${user.name}</td>

<td>${workingDays}</td>

<td>${present}</td>

<td>${absent}</td>

`;

summaryBody.appendChild(row);

});

}



/* BLOCKED */

async function loadBlocked(){

blockedBody.innerHTML="";

const snapshot=await getDocs(
query(collection(db,"users"),
where("accountStatus","==","blocked"))
);

snapshot.forEach(docSnap=>{

const user=docSnap.data();

const row=document.createElement("tr");

row.innerHTML=`

<td>${user.name}</td>
<td>${user.branch}</td>
<td>${user.blockReason}</td>
<td>${user.lastAbsentDate}</td>
<td>

<button data-id="${docSnap.id}">
Unblock
</button>

</td>

`;

blockedBody.appendChild(row);

});


document.querySelectorAll("button[data-id]")
.forEach(btn=>{

btn.onclick=async()=>{

await updateDoc(
doc(db,"users",
btn.dataset.id),
{
accountStatus:"active",
absenceCount:0
}
);

loadBlocked();

};

});

}



/* VERIFY */

window.sendVerify = async function(){

await setDoc(
doc(db,"verificationRequests","chirala"),
{
request:true
}
);

alert("Verification sent");

};



dateInput.addEventListener(
"change",
()=>loadAttendance(dateInput.value)
);


loadAttendance(today);
loadSummary();
loadBlocked();
