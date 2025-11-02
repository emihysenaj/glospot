<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCjH7QD6NhDWWOPedKWvdG5V5HG6GnnbH8",
    authDomain: "glospot.firebaseapp.com",
    projectId: "glospot",
    storageBucket: "glospot.firebasestorage.app",
    messagingSenderId: "5569788371",
    appId: "1:5569788371:web:b0b9862f36be996c4a1726",
    measurementId: "G-87VPZLYDKK"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  export const auth = getAuth(app);
</script>
