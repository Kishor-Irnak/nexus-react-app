import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBVprwDo6-D2Kiew1t9HUFwArc3kee1098",
  authDomain: "database-fa911.firebaseapp.com",
  databaseURL: "https://database-fa911-default-rtdb.firebaseio.com",
  projectId: "database-fa911",
  storageBucket: "database-fa911.appspot.com", // FIXED
  messagingSenderId: "252546770882",
  appId: "1:252546770882:web:05d722d1107f2d95fa585b",
  measurementId: "G-XPXGY7R0NB",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
