// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "nexsite-318e0.firebaseapp.com",
  projectId: "nexsite-318e0",
  storageBucket: "nexsite-318e0.firebasestorage.app",
  messagingSenderId: "452361407670",
  appId: "1:452361407670:web:5d72aab28b48511a4b2a17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth,provider}