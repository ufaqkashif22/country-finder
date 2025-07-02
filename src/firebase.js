///D:\dummycountry\tailwind-dummy-ui\src\firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Replace with your Firebase config from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyDnd5Mmu2BpgSKtVKUTbnJ_o8LspQeY990",
  authDomain: "country-finder-app-41ae2.firebaseapp.com",
  projectId: "country-finder-app-41ae2",
  storageBucket: "country-finder-app-41ae2.firebasestorage.app",
  messagingSenderId: "357074280500",
  appId: "1:357074280500:web:1f91a373897d8d260baa61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
