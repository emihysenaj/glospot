// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Your Firebase config
import { firebaseConfig } from './firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// -------------------- NAVBAR LOGIN STATE --------------------
const signupLink = document.getElementById('signup-link');
const signinLink = document.getElementById('signin-link');
const logoutBtn = document.getElementById('logout-btn');

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    signupLink.style.display = 'none';
    signinLink.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
  } else {
    // User is signed out
    signupLink.style.display = 'inline-block';
    signinLink.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
  }
});

logoutBtn.addEventListener('click', () => {
  signOut(auth).then(() => {
    alert("Logged out successfully");
    window.location.href = 'index.html';
  }).catch((error) => {
    console.error(error);
    alert("Error logging out: " + error.message);
  });
});

// -------------------- SIGN UP --------------------
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('su-name').value;
    const email = document.getElementById('su-email').value;
    const password = document.getElementById('su-password').value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert(`Welcome ${name}! Your account has been created.`);
        window.location.href = 'signin.html';
      })
      .catch((error) => {
        console.error(error);
        alert("Error: " + error.message);
      });
  });
}

// -------------------- SIGN IN --------------------
const signinForm = document.getElementById('signin-form');
if (signinForm) {
  signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('si-email').value;
    const password = document.getElementById('si-password').value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Signed in successfully!");
        window.location.href = 'index.html';
      })
      .catch((error) => {
        console.error(error);
        alert("Error: " + error.message);
      });
  });
}

// -------------------- FORGOT PASSWORD --------------------
const forgotForm = document.getElementById('forgot-form');
if (forgotForm) {
  forgotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('forgot-email').value;

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent!");
        window.location.href = 'signin.html';
      })
      .catch((error) => {
        console.error(error);
        alert("Error: " + error.message);
      });
  });
}
