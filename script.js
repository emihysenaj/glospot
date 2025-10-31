console.log("Welcome to GLOSPOT!");

// Handle Sign Up
if (document.title.includes("Sign Up")) {
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = form.querySelector("input[type='text']").value;
    const email = form.querySelector("input[type='email']").value;
    const password = form.querySelector("input[type='password']").value;

    if(!name || !email || !password){
      alert("Please fill all fields.");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((u) => u.email === email);
    if(existingUser){
      alert("Email already registered. Please sign in.");
      window.location.href = "signin.html";
      return;
    }

    users.push({name,email,password});
    localStorage.setItem("users", JSON.stringify(users));
    alert("Account created!");
    window.location.href = "signin.html";
  });
}

// Handle Sign In
if (document.title.includes("Sign In")) {
  const form = document.querySelector("form");
  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const email = form.querySelector("input[type='email']").value;
    const password = form.querySelector("input[type='password']").value;
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email===email && u.password===password);
    if(user){
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      alert("Welcome back!");
      window.location.href="index.html";
    } else {
      alert("Invalid email or password.");
    }
  });
}

// Show logged in user
if(document.title === "GLOSPOT"){
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const nav = document.getElementById("main-nav");
  const logoutBtn = document.getElementById("logout-btn");
  if(user){
    const span = document.createElement("span");
    span.textContent = `👋 Welcome, ${user.name}`;
    span.style.color = "white";
    span.style.fontWeight = "bold";
    span.style.marginRight="10px";
    nav.insertBefore(span, nav.firstChild);
    logoutBtn.style.display="inline-block";
    document.getElementById("signin-link").style.display="none";
    document.getElementById("signup-link").style.display="none";
  }
}

// Logout
const logoutBtn = document.getElementById("logout-btn");
if(logoutBtn){
  logoutBtn.addEventListener("click", ()=>{
    localStorage.removeItem("loggedInUser");
    alert("Logged out.");
    window.location.reload();
  });
}

// Redirect signed in users from signup/signin pages
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
if(loggedInUser && (document.title.includes("Sign Up") || document.title.includes("Sign In"))){
  window.location.href="index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  // your existing code here
});
