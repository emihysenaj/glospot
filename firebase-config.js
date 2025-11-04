// firebase-config.js

// Make sure to include Firebase scripts in your HTML before this file
// <script src="https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js"></script>
// <script src="https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js"></script>

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
const app = firebase.initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = firebase.auth();

// Expose auth globally
window.auth = auth;
