import React, { createContext, useCallback } from "react";
import { FirebaseContextType } from "../types/FirebaseContextType";
import { initializeApp } from "firebase/app";
import { collection, doc, DocumentSnapshot, getCountFromServer, getDoc, getDocs, getFirestore, limit, orderBy, query, setDoc, startAfter, updateDoc } from "firebase/firestore";
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

    // GET TOTAL NUMBER OF POSTS
    const getTotalDocumentCount = useCallback(async (): Promise<number> => {
        const postsCollectionRef = collection(DB, 'posts');
        const snapshot = await getCountFromServer(postsCollectionRef);
        return snapshot.data().count;
    }, []);

    // GET TOTAL NUMBER OF PAGES
    const getTotalPages = useCallback(async (): Promise<number> => {
        const postsPerPage = 6;
        const totalPosts = await getTotalDocumentCount();
        return Math.ceil(totalPosts / postsPerPage);
    }, []);

    // FETCH POSTS FOR PAGE
    const fetchPostsForPage = useCallback(async (startAfterDoc: DocumentSnapshot | null = null, limitCount: number = 6): Promise<{ posts: Post[], lastVisible: DocumentSnapshot | null }> => {
        const postsCollectionRef = collection(DB, 'posts');

        let q;
        if (startAfterDoc) {
            q = query(postsCollectionRef, orderBy('createdAt', 'desc'), startAfter(startAfterDoc), limit(limitCount));
        } else {
            q = query(postsCollectionRef, orderBy('createdAt', 'desc'), limit(limitCount));
        }
        // const q = query(postsCollectionRef, orderBy('createdAt', 'desc'), startAfter(startAfterDoc), limit(limitCount));
        const querySnapshot = await getDocs(q);
        const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Post[];

        // Get the last visible document snapshot
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1] || null;

        return { posts, lastVisible };
    }, []);

    return <AuthContext.Provider value={{ getAllPosts, getPostById, getTotalDocumentCount, getTotalPages, fetchPostsForPage }}>{children}</AuthContext.Provider>
}