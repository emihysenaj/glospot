import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

// --- Elements ---
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
        createdAt: serverTimestamp()
      });

      authMessage.style.color = "green";
      authMessage.textContent = "Account created successfully!";
      signupForm.reset();

      // Redirect to sign-in
      setTimeout(() => {
        window.location.href = "signin.html";
      }, 1000);
    } catch (error) {
      console.error(error);
      authMessage.style.color = "red";
      switch (error.code) {
        case "auth/email-already-in-use":
          authMessage.textContent = "This email is already in use.";
          break;
        case "auth/invalid-email":
          authMessage.textContent = "Invalid email address.";
          break;
        case "auth/weak-password":
          authMessage.textContent = "Password should be at least 6 characters.";
          break;
        default:
          authMessage.textContent = error.message;
      }
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

      // Redirect to home
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    } catch (error) {
      console.error(error);
      authMessage.style.color = "red";
      switch (error.code) {
        case "auth/wrong-password":
          authMessage.textContent = "Incorrect password.";
          break;
        case "auth/user-not-found":
          authMessage.textContent = "No account found with this email.";
          break;
        case "auth/invalid-email":
          authMessage.textContent = "Invalid email format.";
          break;
        default:
          authMessage.textContent = error.message;
      }
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
