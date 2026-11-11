import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import type { Firestore } from "firebase/firestore";

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
    measurementId: "G-PJBF8C3J5Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication is needed on every page (header session state),
// so it is loaded eagerly - it is a small library.
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Firestore is only needed on content pages and for signed-in users.
// It is loaded on demand so anonymous visitors do not pay for it upfront.
let dbPromise: Promise<Firestore> | null = null;

export const getDb = async (): Promise<Firestore> => {
    if (!dbPromise) {
        dbPromise = import("firebase/firestore").then(({ getFirestore }) => getFirestore(app));
    }
    return dbPromise;
};

export { auth, googleProvider };
