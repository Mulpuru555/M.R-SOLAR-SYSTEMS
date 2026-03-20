import { auth, db } from "./firebase-config.js";

import {
collection,
query,
where,
getDocs,
addDoc,
serverTimestamp,
doc,
updateDoc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

let uid = "";
let editID = "";

onAuthStateChanged(auth, async (user)=>{

if(!user){
location.href="index.html";
return;
}

const snap = await getDoc(doc(db,"users",user.uid));

if(!snap.exists()){
location.href="index.html";
return;
}

const data = snap.data();

if(data.accountStatus === "blocked"){
showBlockedScreen();
return;
}

uid = user.uid;

loadRecords(uid);

});


function showBlockedScreen(){

document.body.innerHTML = `
<div style="height:100vh;display:flex;justify-content:center;align-items:center;background:black;color:white">
<div style="background:#111;padding:40px;border:2px solid red;border-radius:10px;text-align:center">
<h2>ACCOUNT BLOCKED</h2>
<p>Contact Manager</p>
<button id="logoutBtn2">Logout</button>
</div>
</div>
`;

document.getElementById("logoutBtn2").onclick = async ()=>{
await signOut(auth);
location.href="index.html";
};

}


const logoutBtn = document.getElementById("logoutBtn");

if(logoutBtn){
logoutBtn.onclick = async ()=>{
await signOut(auth);
location.href="index.html";
};
}


window.openSection = (id)=>{

document.getElementById("attendanceSection").style.display="none";
document.getElementById("erpSection").style.display="none";

document.getElementById(id).style.display="block";

};


const form = document.getElementById("paymentForm");

if(form){
form.onsubmit = async (e)=>{

e.preventDefault();

const customerName =
document.getElementById("customerName").value;

const executiveName =
document.getElementById("executiveName").value;

const totalAmount =
Number(document.getElementById("totalAmount").value);

await addDoc(
collection(db,"customerPayments"),
{
customerName,
executiveName,
totalAmount,
createdBy: uid,
payments: [],
status: "Pending",
isLocked: true,
createdAt: serverTimestamp()
}
);

loadRecords(uid);

};
}


async function loadRecords(u){

const q = query(
collection(db,"customerPayments"),
where("createdBy","==",u)
);

const snap = await getDocs(q);

const table =
document.getElementById("recordsTable");

table.innerHTML = "";

const docs = [];

snap.forEach(d=>{
docs.push({id:d.id,data:d.data()});
});

docs.sort((a,b)=>{
const t1 = a.data.createdAt?.seconds || 0;
const t2 = b.data.createdAt?.seconds || 0;
return t2 - t1;
});

let i = 1;

docs.forEach(obj=>{

const data = obj.data;
const id = obj.id;

let paid = 0;

(data.payments || []).forEach(p=>paid += p.amount);

const date =
data.createdAt?.seconds
? new Date(data.createdAt.seconds*1000).toLocaleDateString()
: "-";

const locked = data.isLocked !== false;

const editBtn =
locked
? "Locked"
: `<button onclick="openEdit('${id}','${data.customerName}','${data.executiveName}',${data.totalAmount})">Edit</button>`;

table.innerHTML += `
<tr>
<td>${i++}</td>
<td>${data.customerName}</td>
<td>${data.executiveName}</td>
<td>${data.totalAmount}</td>
<td>${paid}</td>
<td>${data.status}</td>
<td>${date}</td>
<td>${locked ? "Locked":"Editable"}</td>
<td>${editBtn}</td>
</tr>
`;

});

}


window.openEdit = (id,name,exec,total)=>{

editID = id;

document.getElementById("editName").value = name;
document.getElementById("editExec").value = exec;
document.getElementById("editTotal").value = total;

document.getElementById("editPopup").style.display="flex";

};


window.closePopup = ()=>{
document.getElementById("editPopup").style.display="none";
};


window.saveEdit = async ()=>{

const ref = doc(db,"customerPayments",editID);

await updateDoc(ref,{
customerName: document.getElementById("editName").value,
executiveName: document.getElementById("editExec").value,
totalAmount: Number(document.getElementById("editTotal").value)
});

closePopup();

loadRecords(uid);

};
