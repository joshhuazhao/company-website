import { useEffect, useState, ReactNode } from 'react';
import {
    User,
    onAuthStateChanged,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import { auth, googleProvider, getDb } from '../firebase';
import { AuthContext } from './authContextDef';

export type { AuthContextType } from './authContextDef';

const saveInitialProfile = async (user: User) => {
    try {
        const token = await user.getIdToken();

        const response = await fetch('/api/profile/bootstrap', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.warn('Profile bootstrap failed with status', response.status);
        }
    } catch (error) {
        // Login should still succeed if the profile API is unavailable.
        console.warn('Unable to bootstrap user profile', error);
    }
};

export 
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    const loginWithGoogle = async () => {
        // 1. Authenticate - this step alone decides whether login succeeds.
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // 2. Best-effort: ensure the Firestore user document (used for roles)
        //    exists. If Firestore is unreachable (database not created in the
        //    Firebase Console yet, or the network blocks googleapis.com),
        //    login still succeeds - the user is simply treated as non-admin
        //    until the connection works.
        try {
            const { doc, getDoc, setDoc, Timestamp } = await import('firebase/firestore');
            const db = await getDb();
            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    role: 'user', // Default role
                    createdAt: Timestamp.now(),
                });
            }
        } catch (error) {
            console.warn('Signed in, but the Firestore user role document could not be updated:', error);
        }

        // 3. Best-effort: create the PostgreSQL profile via the profile API.
        await saveInitialProfile(user);
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setIsAdmin(false);
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);

            if (user) {
                // Fetch user role. Fail closed: on any error the user is
                // treated as a regular user and the site keeps working.
                try {
                    const { doc, getDoc } = await import('firebase/firestore');
                    const db = await getDb();
                    const userRef = doc(db, 'users', user.uid);
                    const userSnap = await getDoc(userRef);

                    if (userSnap.exists()) {
                        const userData = userSnap.data();
                        setIsAdmin(userData.role === 'admin');
                    } else {
                        setIsAdmin(false);
                    }
                } catch (error) {
                    console.warn('Unable to fetch user role', error);
                    setIsAdmin(false);
                }
            } else {
                setIsAdmin(false);
            }

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        isAdmin,
        loading,
        loginWithGoogle,
        logout
    };

    // Render the app immediately for everyone. Public pages do not depend on
    // auth state; only protected routes wait for `loading` (see ProtectedRoute).
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
