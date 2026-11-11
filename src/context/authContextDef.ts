import { createContext } from 'react';
import type { User } from 'firebase/auth';

export interface AuthContextType {
    currentUser: User | null;
    isAdmin: boolean;
    loading: boolean;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
