// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAXSr8PdRmmINMkr0hvLQAwywo5Ngh9K7E",
  authDomain: "ksp-camera-training.firebaseapp.com",
  projectId: "ksp-camera-training",
  storageBucket: "ksp-camera-training.appspot.com",
  messagingSenderId: "226833594490",
  appId: "1:226833594490:web:c9171c6d1bf699bfa423c3",
};
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { app } from "./firebase.js";

const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userRef = doc(db, "users", user.uid); // or "trainees" if stored there
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const role = userSnap.data().role;
      console.log("User role:", role);

      if (role === "admin") {
        window.location.href = "admindashboard.html";
      } else if (role === "trainee") {
        window.location.href = "traineedashboard.html";
      } else {
        alert("Unauthorized role.");
        window.location.href = "adminlogin.html";
      }
    } else {
      alert("User record not found.");
      window.location.href = "adminlogin.html";
    }
  } else {
    window.location.href = "adminlogin.html";
  }
});

import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { app } from "./firebase.js";

const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userRef = doc(db, "users", user.uid); // or "trainees" if stored there
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const role = userSnap.data().role;
      console.log("User role:", role);

      if (role === "admin") {
        window.location.href = "admindashboard.html";
      } else if (role === "trainee") {
        window.location.href = "traineedashboard.html";
      } else {
        alert("Unauthorized role.");
        window.location.href = "adminlogin.html";
      }
    } else {
      alert("User record not found.");
      window.location.href = "adminlogin.html";
    }
  } else {
    window.location.href = "adminlogin.html";
  }
});

export const app = initializeApp(firebaseConfig); // ✅ This initializes Firebase
export const db = getFirestore(app);
export const auth = getAuth(app);