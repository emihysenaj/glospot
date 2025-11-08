import { auth } from './firebase-config.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
  updateProfile
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

// Elements
const nav = document.getElementById("main-nav");
const logoutBtn = document.getElementById("logout-btn");
const signinLink = document.getElementById("signin-link");
const signupLink = document.getElementById("signup-link");

// Helper to show messages in-page
function showMessage(message, color = "green", duration = 3000) {
  let messageDiv = document.getElementById("auth-message");
  if (!messageDiv) {
    messageDiv = document.createElement("div");
    messageDiv.id = "auth-message";
    messageDiv.style.textAlign = "center";
    messageDiv.style.margin = "10px";
    messageDiv.style.fontWeight = "bold";
    document.body.insertBefore(messageDiv, document.body.firstChild);
  }
  messageDiv.textContent = message;
  messageDiv.style.color = color;
  setTimeout(() => {
    messageDiv.textContent = "";
  }, duration);
}

// Update nav based on auth state
onAuthStateChanged(auth, (user) => {
  const welcomeSpan = document.getElementById("user-welcome");

  if(user){
    if(!welcomeSpan){
      const span = document.createElement("span");
      span.id = "user-welcome";
      span.textContent = user.displayName ? `👋 Welcome, ${user.displayName}` : `👋 Welcome, ${user.email}`;
      span.style.color = "white";
      span.style.fontWeight = "bold";
      span.style.marginRight = "10px";
      nav.insertBefore(span, nav.firstChild);
    }
    if(logoutBtn) logoutBtn.style.display="inline-block";
    if(signinLink) signinLink.style.display="none";
    if(signupLink) signupLink.style.display="none";
  } else {
    if(welcomeSpan) welcomeSpan.remove();
    if(logoutBtn) logoutBtn.style.display="none";
    if(signinLink) signinLink.style.display="inline-block";
    if(signupLink) signupLink.style.display="inline-block";
  }
});

// Logout
if(logoutBtn){
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    showMessage("Logged out successfully!");
    window.location.reload();
  });
}

// Sign Up
const signupForm = document.getElementById("signup-form");
if(signupForm){
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("su-name").value.trim();
    const email = document.getElementById("su-email").value.trim();
    const password = document.getElementById("su-password").value.trim();

    if(!name || !email || !password){
      showMessage("Please fill all fields.", "red");
      return;
    }

    try{
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      showMessage("Account created successfully! You can now sign in.");
      setTimeout(() => {
        window.location.href = "signin.html";
      }, 2000);
    } catch(error){
      showMessage(error.message, "red");
    }
  });
}

// Sign In
const signinForm = document.getElementById("signin-form");
if(signinForm){
  signinForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("si-email").value.trim();
    const password = document.getElementById("si-password").value.trim();

    try{
      await signInWithEmailAndPassword(auth, email, password);
      showMessage("Welcome back!");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    } catch(error){
      showMessage(error.message, "red");
    }
  });
}

// Forgot Password
const forgotForm = document.getElementById("forgot-form");
if(forgotForm){
  forgotForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("fp-email").value.trim();
    if(!email){
      showMessage("Please enter your email.", "red");
      return;
    }
    try{
      await sendPasswordResetEmail(auth, email);
      showMessage("Password reset email sent!");
    } catch(error){
      showMessage(error.message, "red");
    }
  });
}

// Redirect if logged in on signup/signin pages
onAuthStateChanged(auth, (user) => {
  if(user && (document.title.includes("Sign Up") || document.title.includes("Sign In"))){
    window.location.href = "index.html";
  }
});
