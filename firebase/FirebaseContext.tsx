import React, { createContext, useCallback } from "react";
import { FirebaseContextType } from "../types/FirebaseContextType";
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { FIREBASE_API } from "../config-global";
import { Post } from "../types/Post";

// ------------------------------------------------------------------------

export const AuthContext = createContext<FirebaseContextType | null>(null);

// ------------------------------------------------------------------------

const app = initializeApp(FIREBASE_API);

const DB = getFirestore(app);

type AuthProviderProps = {
    children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    // FETCH ALL POSTS FROM FIRESTORE
    const getAllPosts = useCallback(async (): Promise<Post> => {
        return Promise.resolve({} as Post);
    }, []);

    return <AuthContext.Provider value={{ getAllPosts }}>{children}</AuthContext.Provider>
}