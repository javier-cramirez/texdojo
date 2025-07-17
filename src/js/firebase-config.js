const firebaseConfig = {
  apiKey: "AIzaSyDYHw9oVZ84207EQYobb7DcxYHJAeazov8",
  authDomain: "latex-scrambler.firebaseapp.com",
  projectId: "latex-scrambler",
  storageBucket: "latex-scrambler.firebasestorage.app",
  messagingSenderId: "59805088347",
  appId: "1:59805088347:web:f780a0440e4e78d0c1dd7e",
  measurementId: "G-B052LGHXCW"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();