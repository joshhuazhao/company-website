import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

// Usage: Call this function with the user's UID (found in Firebase Console or logged in app)
export const makeAdmin = async (uid: string) => {
    try {
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, {
            role: 'admin'
        });
        console.log(`User ${uid} has been promoted to admin.`);
    } catch (error) {
        console.error("Error promoting user:", error);
    }
};

// If running standalone (e.g. ts-node), you might need more setup. 
// Ideally, import this in a component or run via a temporary UI button.
