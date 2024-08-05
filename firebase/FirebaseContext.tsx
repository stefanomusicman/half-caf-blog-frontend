import React, { createContext, useCallback } from "react";
import { FirebaseContextType } from "../types/FirebaseContextType";
import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from "firebase/firestore";
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
    const getAllPosts = useCallback(async (): Promise<Post[]> => {
        console.log(FIREBASE_API);
        try {
            const postsCollectionRef = collection(DB, 'posts');
            const querySnapshot = await getDocs(postsCollectionRef);

            const posts = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })) as Post[];

            return posts;
        } catch (error) {
            console.error('Error fetching posts: ', error);
            throw new Error('Error fetching posts');
        }
    }, []);

    return <AuthContext.Provider value={{ getAllPosts }}>{children}</AuthContext.Provider>
}