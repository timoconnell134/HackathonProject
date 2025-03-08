import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Make sure this API key matches the one from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyB8LedLeX71L577_h6ZqSDHwU92RXlFyzU",
    authDomain: "medication-app-f0c6e.firebaseapp.com",
    projectId: "medication-app-f0c6e",
    storageBucket: "medication-app-f0c6e.appspot.com",
    messagingSenderId: "420249075816",
    appId: "1:420249075816:web:47b0448711195d834b3bdd",
};

// ✅ Prevent multiple Firebase instances
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

console.log("✅ Firebase initialized successfully!");

export { auth, db };
