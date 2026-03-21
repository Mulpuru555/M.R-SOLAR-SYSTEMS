import { auth, db, storage } from "./firebase-config.js";

import {
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
doc,
getDoc,
addDoc,
collection,
serverTimestamp
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
ref,
uploadString,
getDownloadURL
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";


const empName = document.getElementById("empName");
const gpsStatus = document.getElementById("gpsStatus");

const morningBtn = document.getElementById("morningBtn");
const eveningBtn = document.getElementById("eveningBtn");

const cameraBox = document.getElementById("cameraBox");
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");

const captureBtn = document.getElementById("captureBtn");
const cancelBtn = document.getElementById("cancelBtn");

const verifyScreen = document.getElementById("verifyScreen");
const verifyText = document.getElementById("verifyText");

const successScreen = document.getElementById("successScreen");


let currentUser;
let stream;
let typeSelected = "";


/* LOGIN */

onAuthStateChanged(auth, async (user) => {

if (!user) {
window.location.href = "index.html";
return;
}

currentUser = user;

const snap = await getDoc(doc(db, "users", user.uid));

empName.innerText = snap.data().name;

checkGPS();

});


window.logoutUser = async () => {

await signOut(auth);
window.location.href = "index.html";

};


/* GPS */

let officeLat;
let officeLng;
let radius;


async function checkGPS() {

const snap = await getDoc(doc(db, "settings", "location"));

const data = snap.data();

officeLat = data.point.latitude;
officeLng = data.point.longitude;
radius = data.radius;

navigator.geolocation.getCurrentPosition(pos => {

const lat = pos.coords.latitude;
const lng = pos.coords.longitude;

const d = distance(lat, lng, officeLat, officeLng);

if (d <= radius) {

gpsStatus.innerText = "GPS OK";

} else {

gpsStatus.innerText = "Outside office";

}

});

}


function distance(lat1, lon1, lat2, lon2) {

const R = 6371e3;

const φ1 = lat1 * Math.PI/180;
const φ2 = lat2 * Math.PI/180;

const Δφ = (lat2-lat1) * Math.PI/180;
const Δλ = (lon2-lon1) * Math.PI/180;

const a =
Math.sin(Δφ/2) *
Math.sin(Δφ/2) +
Math.cos(φ1) *
Math.cos(φ2) *
Math.sin(Δλ/2) *
Math.sin(Δλ/2);

const c =
2 *
Math.atan2(
Math.sqrt(a),
Math.sqrt(1-a)
);

return R * c;

}


/* BUTTONS */

morningBtn.onclick = () => {

typeSelected = "morning";
openCamera();

};

eveningBtn.onclick = () => {

typeSelected = "evening";
openCamera();

};


/* CAMERA */

async function openCamera() {

cameraBox.style.display = "flex";

stream = await navigator.mediaDevices.getUserMedia({
video: true
});

video.srcObject = stream;

}


cancelBtn.onclick = () => {

cameraBox.style.display = "none";

if (stream) {

stream.getTracks().forEach(t => t.stop());

}

};


/* CAPTURE */

captureBtn.onclick = async () => {

canvas.width = video.videoWidth;
canvas.height = video.videoHeight;

const ctx = canvas.getContext("2d");

ctx.drawImage(video, 0, 0);

cameraBox.style.display = "none";

stream.getTracks().forEach(t => t.stop());

verify();

};


/* VERIFY */

async function verify() {

verifyScreen.style.display = "flex";

const steps = [
"Checking GPS...",
"Capturing...",
"Verifying face...",
"Processing..."
];

for (let s of steps) {

verifyText.innerText = s;

await delay(1200);

}

await saveAttendance();

verifyText.innerText = "Success";

await delay(800);

verifyScreen.style.display = "none";

successScreen.style.display = "flex";

setTimeout(() => {

successScreen.style.display = "none";

}, 1500);

}


function delay(ms) {

return new Promise(r => setTimeout(r, ms));

}


/* SAVE */

async function saveAttendance() {

const dataURL =
canvas.toDataURL("image/jpeg");

const fileName =
Date.now() + ".jpg";

const storageRef =
ref(storage,
"attendance/" + fileName);

await uploadString(
storageRef,
dataURL,
"data_url"
);

const url =
await getDownloadURL(storageRef);


const today =
new Date().toISOString().slice(0,10);

const del =
new Date();

del.setDate(del.getDate()+1);

const deleteAfter =
del.toISOString().slice(0,10);


await addDoc(
collection(db,"attendance"),
{
employeeId: currentUser.uid,
date: today,
type: typeSelected,
timestamp: serverTimestamp(),
photoURL: url,
deleteAfter: deleteAfter
}
);

}
