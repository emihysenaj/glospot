// Import the functions you need from the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnOLBrMG-WBsEhAjRDYKVb897JUqa2zDE",
  authDomain: "glospot-eed75.firebaseapp.com",
  projectId: "glospot-eed75",
  storageBucket: "glospot-eed75.firebasestorage.app",
  messagingSenderId: "235809233045",
  appId: "1:235809233045:web:f0ab9a813df1e286c2e39c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
