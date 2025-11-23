import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

// Firebase app is initialized in firebase-config.js
const auth = getAuth();
const db = getFirestore();

// Elements
const signupForm = document.getElementById("signup-form");
const signinForm = document.getElementById("signin-form");
const logoutBtn = document.getElementById("logout-btn");
const authMessage = document.getElementById("auth-message");
const signupLink = document.getElementById("signup-link");
const signinLink = document.getElementById("signin-link");

// --- SIGN UP ---
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("su-name").value.trim();
    const email = document.getElementById("su-email").value.trim();
    const password = document.getElementById("su-password").value;

    if (!name || !email || !password) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update display name
      await updateProfile(user, { displayName: name });

      // Save extra info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        createdAt: new Date()
      });

      authMessage.style.color = "green";
      authMessage.textContent = "Account created successfully!";
      signupForm.reset();
      window.location.href = "signin.html"; // redirect to signin
    } catch (error) {
      authMessage.style.color = "red";
      authMessage.textContent = error.message;
    }
  });
}

// --- SIGN IN ---
if (signinForm) {
  signinForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("si-email").value.trim();
    const password = document.getElementById("si-password").value;

    if (!email || !password) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      authMessage.style.color = "green";
      authMessage.textContent = "Signed in successfully!";
      signinForm.reset();
      window.location.href = "index.html"; // redirect after login
    } catch (error) {
      authMessage.style.color = "red";
      authMessage.textContent = error.message;
    }
  });
}

// --- LOGOUT ---
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  });
}

// --- AUTH STATE LISTENER ---
onAuthStateChanged(auth, (user) => {
  if (user) {
    logoutBtn.style.display = "inline-block";
    signinLink.style.display = "none";
    signupLink.style.display = "none";
  } else {
    logoutBtn.style.display = "none";
    signinLink.style.display = "inline-block";
    signupLink.style.display = "inline-block";
  }
});
