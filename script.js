// script.js

console.log("Welcome to GLOSPOT!");

// ---------- NAVBAR & LOGGED-IN STATE ----------
const nav = document.getElementById("main-nav");
const logoutBtn = document.getElementById("logout-btn");

auth.onAuthStateChanged(user => {
  const signinLink = document.getElementById("signin-link");
  const signupLink = document.getElementById("signup-link");

  if(user){
    if(!document.getElementById("user-welcome")){
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
    const welcome = document.getElementById("user-welcome");
    if(welcome) welcome.remove();
    if(logoutBtn) logoutBtn.style.display="none";
    if(signinLink) signinLink.style.display="inline-block";
    if(signupLink) signupLink.style.display="inline-block";
  }
});

// ---------- LOGOUT ----------
if(logoutBtn){
  logoutBtn.addEventListener("click", () => {
    auth.signOut().then(() => {
      alert("Logged out successfully.");
      window.location.reload();
    });
  });
}

// ---------- SIGN UP ----------
const signupForm = document.getElementById("signup-form");
if(signupForm){
  signupForm.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("su-name").value;
    const email = document.getElementById("su-email").value;
    const password = document.getElementById("su-password").value;

    if(!name || !email || !password){
      alert("Please fill all fields.");
      return;
    }

    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        return userCredential.user.updateProfile({ displayName: name });
      })
      .then(() => {
        alert("Account created successfully! You can now sign in.");
        window.location.href = "signin.html";
      })
      .catch(error => {
        alert(error.message);
      });
  });
}

// ---------- SIGN IN ----------
const signinForm = document.getElementById("signin-form");
if(signinForm){
  signinForm.addEventListener("submit", e => {
    e.preventDefault();

    const email = document.getElementById("si-email").value;
    const password = document.getElementById("si-password").value;

    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        alert("Welcome back!");
        window.location.href = "index.html";
      })
      .catch(error => {
        alert(error.message);
      });
  });
}

// ---------- FORGOT PASSWORD ----------
const forgotForm = document.getElementById("forgot-form");
if(forgotForm){
  forgotForm.addEventListener("submit", e => {
    e.preventDefault();

    const email = document.getElementById("fp-email").value;

    auth.sendPasswordResetEmail(email)
      .then(() => {
        alert("Password reset email sent! Check your inbox.");
      })
      .catch(error => {
        alert(error.message);
      });
  });
}

// ---------- REDIRECT SIGNED-IN USERS ----------
auth.onAuthStateChanged(user => {
  if(user){
    if(document.title.includes("Sign Up") || document.title.includes("Sign In")){
      window.location.href = "index.html";
    }
  }
});
