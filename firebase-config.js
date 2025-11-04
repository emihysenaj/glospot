// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnOLBrMG-WBsEhAjRDYKVb897JUqa2zDE",
  authDomain: "glospot-eed75.firebaseapp.com",
  projectId: "glospot-eed75",
  storageBucket: "glospot-eed75.firebasestorage.app",
  messagingSenderId: "235809233045",
  appId: "1:235809233045:web:f0ab9a813df1e286c2e39c",
  measurementId: "G-1VCH03DH82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
