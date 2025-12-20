import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, PhoneAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyAkBmS0uKNdejThlsxCNyoDhsQn0THpN4k",
  authDomain: "satyacert-22c26.firebaseapp.com",
  projectId: "satyacert-22c26",
  storageBucket: "satyacert-22c26.firebasestorage.app",
  messagingSenderId: "827819345422",
  appId: "1:827819345422:web:040139f06266b7d3135e5f",
  measurementId: "G-NQMJ9H5G42"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
export const phoneProvider = new PhoneAuthProvider(auth);
export const storage = getStorage(app);
