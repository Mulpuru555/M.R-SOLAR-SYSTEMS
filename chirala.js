import { auth, db, storage } from "./firebase-config.js";

import {
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
doc,
setDoc,
onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
ref,
uploadBytes
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";


console.log("JS running");


const msg = document.getElementById("msg");
const gpsStatus = document.getElementById("gpsStatus");
const empName = document.getElementById("empName");
const popup = document.getElementById("verifyPopup");

let userId = "";

const officeLat = 15.829398363781864;
const officeLng = 80.35605609999999;

const maxDistance = 200;



// LOGIN

onAuthStateChanged(auth,(user)=>{

if(!user){

window.location.href="index.html";
return;

}

userId=user.uid;

empName.innerText=user.email;

checkGPS();

});



// LOGOUT

window.logoutUser = async function(){

await signOut(auth);

window.location.href="index.html";

};



// GPS

function getGPS(){

return new Promise((resolve,reject)=>{

navigator.geolocation.getCurrentPosition(

pos=>resolve(pos.coords),

err=>reject(err),

{
enableHighAccuracy:true,
timeout:10000
}

);

});

}



function getDistance(lat1,lon1,lat2,lon2){

const R=6371000;

const dLat=(lat2-lat1)*Math.PI/180;
const dLon=(lon2-lon1)*Math.PI/180;

const a=
Math.sin(dLat/2)**2+
Math.cos(lat1*Math.PI/180)*
Math.cos(lat2*Math.PI/180)*
Math.sin(dLon/2)**2;

const c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));

return R*c;

}



async function checkGPS(){

gpsStatus.innerText="Checking GPS";

try{

const c=await getGPS();

const d=getDistance(
c.latitude,
c.longitude,
officeLat,
officeLng
);

gpsStatus.innerText="Distance "+Math.round(d)+" m";

}catch{

gpsStatus.innerText="GPS error";

}

}



// ATTENDANCE

window.markAttendance = async function(){

try{

const now=new Date();

if(now.getHours()>=10){

msg.innerText="Only before 10 AM";
return;

}

const coords=await getGPS();

const dist=getDistance(
coords.latitude,
coords.longitude,
officeLat,
officeLng
);

if(dist>maxDistance){

msg.innerText="Not in office";
return;

}

const selfie=document.getElementById("selfie").files[0];
const office=document.getElementById("office").files[0];

if(!selfie||!office){

msg.innerText="Upload photos";
return;

}

const date=new Date().toISOString().slice(0,10);

await uploadBytes(
ref(storage,"chirala/"+date+"/s_"+userId),
selfie
);

await uploadBytes(
ref(storage,"chirala/"+date+"/o_"+userId),
office
);

await setDoc(
doc(db,"chiralaAttendance",date+"_"+userId),
{
userId,
time:Date.now()
}
);

msg.innerText="Saved";

}catch(e){

console.log(e);
msg.innerText="Error";

}

};



// VERIFY LISTENER

const verifyDoc=doc(db,"verificationRequests","chirala");

onSnapshot(verifyDoc,(snap)=>{

if(!snap.exists()) return;

const data=snap.data();

if(data.request){

popup.style.display="block";

}

});



// SUBMIT VERIFY

window.submitVerify=async function(){

const file=document.getElementById("verifyPhoto").files[0];

if(!file) return;

const date=new Date().toISOString().slice(0,10);

await uploadBytes(
ref(storage,"verify/"+date+"/"+userId),
file
);

await setDoc(
doc(db,"verificationRequests","chirala"),
{request:false}
);

popup.style.display="none";

};
