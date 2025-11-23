import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Elements
const signupForm = document.getElementById("signup-form");
const signinForm = document.getElementById("signin-form");
const logoutBtn = document.getElementById("logout-btn");
const authMessage = document.getElementById("auth-message");
const signupLink = document.getElementById("signup-link");
const signinLink = document.getElementById("signin-link");

// --- Helper function to display friendly Firebase error messages ---
function getFriendlyErrorMessage(errorCode) {
  switch(errorCode) {
    case 'auth/email-already-in-use':
      return "This email is already registered. Please use another email or sign in.";
    case 'auth/invalid-email':
      return "Invalid email address format.";
    case 'auth/weak-password':
      return "Password should be at least 6 characters.";
    case 'auth/user-not-found':
      return "No account found with this email.";
    case 'auth/wrong-password':
      return "Incorrect password. Please try again.";
    case 'auth/too-many-requests':
      return "Too many attempts. Please try again later.";
    default:
      return "An error occurred. Please try again.";
  }
}

// --- SIGN UP ---
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("su-name").value.trim();
    const email = document.getElementById("su-email").value.trim();
    const password = document.getElementById("su-password").value;

    if (!name || !email || !password) {
      authMessage.style.color = "red";
      authMessage.textContent = "Please fill in all fields.";
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update display name
      await updateProfile(user, { displayName: name });

      // Save user info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        createdAt: new Date()
      });

      authMessage.style.color = "green";
      authMessage.textContent = "Account created successfully! Redirecting...";
      signupForm.reset();

      // Redirect to sign-in page after 1.5s
      setTimeout(() => window.location.href = "signin.html", 1500);
    } catch (error) {
      authMessage.style.color = "red";
      authMessage.textContent = getFriendlyErrorMessage(error.code);
    }
  });
}

// --- SIGN IN ---
if (signinForm) {
  signinForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("si-email").value.trim();
    const password = document.getElementById("si-password").value;

    if (!email || !password) {
      authMessage.style.color = "red";
      authMessage.textContent = "Please enter both email and password.";
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      authMessage.style.color = "green";
      authMessage.textContent = "Signed in successfully! Redirecting...";
      signinForm.reset();

      // Redirect to home page after 1.5s
      setTimeout(() => window.location.href = "index.html", 1500);
    } catch (error) {
      authMessage.style.color = "red";
      authMessage.textContent = getFriendlyErrorMessage(error.code);
    }
  });
}

// --- LOGOUT ---
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
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
