// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8_QC0oegN8ftt9G2fWJ70raFKJMAP-NI",
  authDomain: "yo-blog.firebaseapp.com",
  projectId: "yo-blog",
  storageBucket: "yo-blog.appspot.com",
  messagingSenderId: "701008240197",
  appId: "1:701008240197:web:ac3c836487c93a98cdcd2c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
