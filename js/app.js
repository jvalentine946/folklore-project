
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyA49uJ9DWzc-doo5FXbODZzxvUAEdGVy9w",
    authDomain: "nidrasc-8b591.firebaseapp.com",
    projectId: "nidrasc-8b591",
    storageBucket: "nidrasc-8b591.firebasestorage.app",
    messagingSenderId: "622786632783",
    appId: "1:622786632783:web:d6a805aab1039d8c991e3a",
    measurementId: "G-FR2SGRRKF7"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
