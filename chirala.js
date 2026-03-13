import { auth, db, storage } from "./firebase-config.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
doc,
setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
ref,
uploadBytes
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";


const msg = document.getElementById("msg");
const gpsStatus = document.getElementById("gpsStatus");


let userId = "";

onAuthStateChanged(auth,(user)=>{

if(user){

userId = user.uid;

}

});


function getGPS(){

return new Promise((resolve,reject)=>{

navigator.geolocation.getCurrentPosition(pos=>{

resolve(pos.coords);

});

});

}


window.markAttendance = async function(){

msg.innerText="Checking GPS...";

const coords = await getGPS();

gpsStatus.innerText="GPS OK";


const selfieFile =
document.getElementById("selfie").files[0];

const officeFile =
document.getElementById("office").files[0];


if(!selfieFile || !officeFile){

msg.innerText="Upload photos";

return;

}


const date =
new Date().toISOString().slice(0,10);


const selfieRef =
ref(storage,
"chirala/"+date+"/selfie_"+userId);

const officeRef =
ref(storage,
"chirala/"+date+"/office_"+userId);


await uploadBytes(selfieRef,selfieFile);
await uploadBytes(officeRef,officeFile);


await setDoc(
doc(db,"chiralaAttendance",date+"_"+userId),
{
userId,
gpsLat:coords.latitude,
gpsLng:coords.longitude,
time:Date.now()
}
);


msg.innerText="Attendance Saved";

};
