// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXSr8PdRmmINMkr0hvLQAwywo5Ngh9K7E",
  authDomain: "ksp-camera-training.firebaseapp.com",
  projectId: "ksp-camera-training",
  storageBucket: "ksp-camera-training.firebasestorage.app",
  messagingSenderId: "226833594490",
  appId: "1:226833594490:web:c9171c6d1bf699bfa423c3",
  measurementId: "G-QG06RXWSBQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);