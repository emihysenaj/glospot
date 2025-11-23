import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

const signinForm = document.getElementById("signin-form");
const authMessage = document.getElementById("auth-message");

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
      window.location.href = "index.html";
    } catch (error) {
      console.error(error); // check full error object in console
      authMessage.style.color = "red";

      // Friendly error messages
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
