<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCjH7QD6NhDWWOPedKWvdG5V5HG6GnnbH8",
    authDomain: "glospot.firebaseapp.com",
    projectId: "glospot",
    storageBucket: "glospot.firebasestorage.app",
    messagingSenderId: "5569788371",
    appId: "1:5569788371:web:b0b9862f36be996c4a1726",
    measurementId: "G-87VPZLYDKK"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
