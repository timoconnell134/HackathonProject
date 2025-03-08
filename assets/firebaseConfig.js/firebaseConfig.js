import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
apiKey: "AIzaSyBWORVt5ItQ1tYerFzGWMGgW55NUw0P5tE",
authDomain: "medication-reminder-app-6662b.firebaseapp.com",
projectId: "medication-reminder-app-6662b",
storageBucket: "medication-reminder-app-6662b.firebasestorage.app",
messagingSenderId: "75663380450",
appId: "1:75663380450:web:125179a9fa30e4c737f3bb",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
