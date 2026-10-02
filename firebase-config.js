import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDfimfCtBFOnRiZ5tzPDrcUdHzckmz2HzU",
  authDomain: "divert-typing-practice.firebaseapp.com",
  projectId: "divert-typing-practice",
  storageBucket: "divert-typing-practice.firebasestorage.app",
  messagingSenderId: "268018955995",
  appId: "1:268018955995:web:262c08da4eed68c7577efe",
  measurementId: "G-RCLQFB8D4Y"
};

// Firebase initialize
const app = initializeApp(firebaseConfig);

// Authentication
const auth = getAuth(app);

// Firestore Database
const db = getFirestore(app);

export { app, auth, db };