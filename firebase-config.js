// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your Firebase Config (Get it from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyAkr0wVIyrR1WWqGhpXsBVb6l53zORTP-k",
  authDomain: "livewire-website-1.firebaseapp.com",
  projectId: "livewire-website-1",
  storageBucket: "livewire-website-1.firebasestorage.app",
  messagingSenderId: "1007950637244",
  appId: "1:1007950637244:web:00e946ea666dcd9ed848b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
