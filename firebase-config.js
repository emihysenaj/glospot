import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDnOLBrMG-WBsEhAjRDYKVb897JUqa2zDE",
  authDomain: "glospot-eed75.firebaseapp.com",
  projectId: "glospot-eed75",
  storageBucket: "glospot-eed75.firebasestorage.app",
  messagingSenderId: "235809233045",
  appId: "1:235809233045:web:f0ab9a813df1e286c2e39c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
