import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBVN2PgstAXFVh_85vtkwR8UiYB9N8h1QE",
    authDomain: "leanjust-website.firebaseapp.com",
    projectId: "leanjust-website",
    storageBucket: "leanjust-website.firebasestorage.app",
    messagingSenderId: "456650590922",
    appId: "1:456650590922:web:3c8d59761aac96ddab4233",
    measurementId: "G-PJBF8C3J5W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Initialize Firestore
import { getFirestore } from "firebase/firestore";
const db = getFirestore(app);

export { auth, googleProvider, db };
