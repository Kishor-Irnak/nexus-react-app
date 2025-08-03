// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBVprwDo6-D2Kiew1t9HUFwArc3kee1098",
  authDomain: "database-fa911.firebaseapp.com",
  databaseURL: "https://database-fa911-default-rtdb.firebaseio.com",
  projectId: "database-fa911",
  storageBucket: "database-fa911.firebasestorage.app",
  messagingSenderId: "252546770882",
  appId: "1:252546770882:web:05d722d1107f2d95fa585b",
  measurementId: "G-XPXGY7R0NB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
