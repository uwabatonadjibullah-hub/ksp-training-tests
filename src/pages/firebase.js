// firebase.js

// ✅ Import Firebase core and services
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAXSr8PdRmmINMkr0hvLQAwywo5Ngh9K7E",
  authDomain: "ksp-camera-training.firebaseapp.com",
  projectId: "ksp-camera-training",
  storageBucket: "ksp-camera-training.appspot.com", // 🔧 Corrected domain
  messagingSenderId: "226833594490",
  appId: "1:226833594490:web:c9171c6d1bf699bfa423c3",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);