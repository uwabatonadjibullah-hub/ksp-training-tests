// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAXSr8PdRmmINMkr0hvLQAwywo5Ngh9K7E",
  authDomain: "ksp-camera-training.firebaseapp.com",
  projectId: "ksp-camera-training",
  storageBucket: "ksp-camera-training.appspot.com",
  messagingSenderId: "226833594490",
  appId: "1:226833594490:web:c9171c6d1bf699bfa423c3",
};

const app = initializeApp(firebaseConfig);

// Core services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const storage = getStorage(app); // 🔥 Added for handouts & images