import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
 apiKey: "AIzaSyBNtPFzFkYLpbv8vgfeQ0_uE42JT7h28bc",
  authDomain: "mr-solar-portal.firebaseapp.com",
  projectId: "mr-solar-portal",
  storageBucket: "mr-solar-portal.firebasestorage.app",
  messagingSenderId: "1017116122935",
  appId: "1:1017116122935:web:db1256b90c66c96ad644b2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("paymentForm");
  const message = document.getElementById("message");

  if (!form) {
    console.error("Form not found in HTML");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "login.html";
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const customerName = document.getElementById("customerName").value;
    const executiveName = document.getElementById("executiveName").value;
    const sanctionedAmount = document.getElementById("sanctionedAmount").value;

    try {
      await addDoc(collection(db, "customerPayments"), {
        customerName,
        executiveName,
        sanctionedAmount: Number(sanctionedAmount),
        paidAmount: 0,
        createdBy: auth.currentUser.uid,
        createdAt: serverTimestamp()
      });

      message.innerText = "Customer Added Successfully!";
      form.reset();

    } catch (error) {
      message.innerText = error.message;
    }
  });

});
