// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjH7QD6NhDWWOPedKWvdG5V5HG6GnnbH8",
  authDomain: "glospot.firebaseapp.com",
  projectId: "glospot",
  storageBucket: "glospot.firebasestorage.app",
  messagingSenderId: "5569788371",
  appId: "1:5569788371:web:b0b9862f36be996c4a1726",
  measurementId: "G-87VPZLYDKK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

