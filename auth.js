import { auth } from './firebase-config.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
  updateProfile
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

// NAVBAR ELEMENTS
const nav = document.getElementById("main-nav");
const logoutBtn = document.getElementById("logout-btn");
const signinLink = document.getElementById("signin-link");
const signupLink = document.getElementById("signup-link");

// UPDATE NAVBAR BASED ON USER STATE
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

// LOGOUT
if(logoutBtn){
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    alert("Logged out successfully!");
    window.location.reload();
  });
}

// SIGN UP FORM
const signupForm = document.getElementById("signup-form");
if(signupForm){
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("su-name").value;
    const email = document.getElementById("su-email").value();
    const password = document.getElementById("su-password").value;

    if(!name || !email || !password){
      alert("Please fill all fields.");
      return;
    }

    try{
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      alert("Account created successfully! You can now sign in.");
      window.location.href = "signin.html";
    } catch(error){
      alert(error.message);
    }
  });
}

// SIGN IN FORM
const signinForm = document.getElementById("signin-form");
if(signinForm){
  signinForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("si-email").value.trim();
    const password = document.getElementById("si-password").value.trim();

    try{
      await signInWithEmailAndPassword(auth, email, password);
      alert("Welcome back!");
      window.location.href = "index.html";
    } catch(error){
      alert(error.message);
    }
  });
}

// FORGOT PASSWORD
const forgotForm = document.getElementById("forgot-form");
if(forgotForm){
  forgotForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("fp-email").value.trim();
    try{
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch(error){
      alert(error.message);
    }
  });
}

// REDIRECT SIGNED-IN USERS FROM SIGNUP/SIGNIN
onAuthStateChanged(auth, (user) => {
  if(user && (document.title.includes("Sign Up") || document.title.includes("Sign In"))){
    window.location.href = "index.html";
  }
});
