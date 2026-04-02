import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const signupForm   = document.getElementById("signup-form");
const signinForm   = document.getElementById("signin-form");
const forgotForm   = document.getElementById("forgot-form");
const logoutBtn    = document.getElementById("logout-btn");
const authMessage  = document.getElementById("auth-message");
const signupLink   = document.getElementById("signup-link");
const signinLink   = document.getElementById("signin-link");

function showMessage(text, type) {
  if (!authMessage) return;
  authMessage.textContent = text;
  authMessage.className = type; // 'success' or 'error'
}

function setLoading(btn, loading, originalText) {
  btn.disabled = loading;
  btn.textContent = loading ? "Please wait..." : originalText;
}

function getFriendlyError(code) {
  const messages = {
    'auth/email-already-in-use': "This email is already registered. Please sign in.",
    'auth/invalid-email': "Invalid email address format.",
    'auth/weak-password': "Password must be at least 6 characters.",
    'auth/user-not-found': "No account found with this email.",
    'auth/wrong-password': "Incorrect password. Please try again.",
    'auth/invalid-credential': "Incorrect email or password. Please try again.",
    'auth/too-many-requests': "Too many attempts. Please try again later.",
  };
  return messages[code] || "An error occurred. Please try again.";
}

// --- SIGN UP ---
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name     = document.getElementById("su-name").value.trim();
    const email    = document.getElementById("su-email").value.trim();
    const password = document.getElementById("su-password").value;
    const btn      = signupForm.querySelector("button[type='submit']");

    if (!name || !email || !password) {
      showMessage("Please fill in all fields.", "error"); return;
    }

    setLoading(btn, true, "Sign Up");
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });
      await setDoc(doc(db, "users", cred.user.uid), { name, email, createdAt: new Date() });
      showMessage("Account created! Redirecting...", "success");
      signupForm.reset();
      setTimeout(() => window.location.href = "signin.html", 1500);
    } catch (err) {
      showMessage(getFriendlyError(err.code), "error");
      setLoading(btn, false, "Sign Up");
    }
  });
}

// --- SIGN IN ---
if (signinForm) {
  signinForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email    = document.getElementById("si-email").value.trim();
    const password = document.getElementById("si-password").value;
    const btn      = signinForm.querySelector("button[type='submit']");

    if (!email || !password) {
      showMessage("Please enter your email and password.", "error"); return;
    }

    setLoading(btn, true, "Sign In");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showMessage("Signed in! Redirecting...", "success");
      signinForm.reset();
      setTimeout(() => window.location.href = "index.html", 1500);
    } catch (err) {
      showMessage(getFriendlyError(err.code), "error");
      setLoading(btn, false, "Sign In");
    }
  });
}

// --- FORGOT PASSWORD ---
if (forgotForm) {
  forgotForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("fp-email").value.trim();
    const btn   = forgotForm.querySelector("button[type='submit']");

    if (!email) {
      showMessage("Please enter your email address.", "error"); return;
    }

    setLoading(btn, true, "Send Reset Email");
    try {
      await sendPasswordResetEmail(auth, email);
      showMessage("Reset email sent! Check your inbox.", "success");
      forgotForm.reset();
    } catch (err) {
      showMessage(getFriendlyError(err.code), "error");
    }
    setLoading(btn, false, "Send Reset Email");
  });
}

// --- LOGOUT ---
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "index.html";
  });
}

// --- AUTH STATE: show/hide nav links & redirect logged-in users away from auth pages ---
onAuthStateChanged(auth, (user) => {
  const isAuthPage = window.location.pathname.includes("signin.html") ||
                     window.location.pathname.includes("signup.html") ||
                     window.location.pathname.includes("forgot-password.html");

  if (user) {
    if (isAuthPage) { window.location.href = "index.html"; return; }
    if (logoutBtn)  logoutBtn.style.display = "inline-block";
    if (signinLink) signinLink.style.display = "none";
    if (signupLink) signupLink.style.display = "none";
  } else {
    if (logoutBtn)  logoutBtn.style.display = "none";
    if (signinLink) signinLink.style.display = "inline-block";
    if (signupLink) signupLink.style.display = "inline-block";
  }
});
