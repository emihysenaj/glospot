// auth.js
import { auth } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

// Elements
const logoutBtn = document.getElementById("logout-btn");
const signinLink = document.getElementById("signin-link");
const signupLink = document.getElementById("signup-link");

// --- LOGOUT ---
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      // Optional: show a small message or redirect
      window.location.href = "index.html";
    } catch (error) {
      console.error("Logout error:", error);
    }
  });
}

// --- AUTH STATE LISTENER ---
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    if (logoutBtn) logoutBtn.style.display = "inline-block";
    if (signinLink) signinLink.style.display = "none";
    if (signupLink) signupLink.style.display = "none";
  } else {
    // User is signed out
    if (logoutBtn) logoutBtn.style.display = "none";
    if (signinLink) signinLink.style.display = "inline-block";
    if (signupLink) signupLink.style.display = "inline-block";
  }
});
