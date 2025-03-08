import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB8LedLeX71L577_h6ZqSDHwU92RXlFyzU",
    authDomain: "medication-app-f0c6e.firebaseapp.com",
    projectId: "medication-app-f0c6e",
    storageBucket: "medication-app-f0c6e.appspot.com", // ✅ Fixed
    messagingSenderId: "420249075816",
    appId: "1:420249075816:web:47b0448711195d834b3bdd",
    measurementId: "G-ENVK9VJFN6" // (Can be removed, optional)
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("✅ Firebase has been initialized successfully!");

export { db, collection, addDoc, getDocs, deleteDoc, doc };
