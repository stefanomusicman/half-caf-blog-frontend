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

    // FETCH POST BY ID
    const getPostById = useCallback(async (id: string): Promise<Post> => {
        try {
            const postRef = doc(DB, 'posts', id);
            const postSnapshot = await getDoc(postRef);

            if (postSnapshot.exists()) {
                return { ...postSnapshot.data() } as Post;
            } else {
                throw new Error(`No post found with the id: ${id}`);
            }
        } catch (error) {
            console.error('Error fetching posts: ', error);
            throw new Error(`Error fetching post with id: ${id}`);
        }
    }, []);

    return <AuthContext.Provider value={{ getAllPosts, getPostById }}>{children}</AuthContext.Provider>
}