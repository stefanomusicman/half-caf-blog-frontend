import React, { createContext, useCallback, useState } from "react";
import { FirebaseContextType } from "../types/FirebaseContextType";
import { initializeApp } from "firebase/app";
import { collection, doc, DocumentSnapshot, endAt, getCountFromServer, getDoc, getDocs, getFirestore, limit, orderBy, query, setDoc, startAfter, startAt, updateDoc, where } from "firebase/firestore";
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
    const [cachedPosts, setCachedPosts] = useState<Post[] | null>(null);

    // FETCH ALL POSTS FROM FIRESTORE
    const getAllPosts = useCallback(async (): Promise<Post[]> => {
        if (cachedPosts !== null) {
            return cachedPosts;
        }

        try {
            const postsCollectionRef = collection(DB, 'posts');
            const querySnapshot = await getDocs(postsCollectionRef);

            const posts = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })) as Post[];

            setCachedPosts(posts);
            return posts;
        } catch (error) {
            console.error('Error fetching posts: ', error);
            throw new Error('Error fetching posts');
        }
    }, [cachedPosts]);

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
    }, [getTotalDocumentCount]);

    // FETCH POSTS FOR PAGE
    const fetchPostsForPage = useCallback(async (startAfterDoc: DocumentSnapshot | null = null, limitCount: number = 6): Promise<{ posts: Post[], lastVisible: DocumentSnapshot | null }> => {
        const postsCollectionRef = collection(DB, 'posts');

        let q;
        if (startAfterDoc) {
            q = query(postsCollectionRef, orderBy('createdAt', 'desc'), startAfter(startAfterDoc), limit(limitCount));
        } else {
            q = query(postsCollectionRef, orderBy('createdAt', 'desc'), limit(limitCount));
        }
        const querySnapshot = await getDocs(q);
        const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Post[];

        // Get the last visible document snapshot
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1] || null;

        return { posts, lastVisible };
    }, []);

    // FETCH POSTS BASED ON SEARCH TERM
    const fetchPostsBySearchTerm = useCallback(async (searchTerm: string): Promise<Post[]> => {
        const postsCollectionRef = collection(DB, 'posts');
        const lowercasedTerm = searchTerm.toLowerCase();

        // const q = query(postsCollectionRef, orderBy('title'), startAt(searchTerm), endAt(searchTerm + '\uf8ff'));
        const q = query(postsCollectionRef, where('searchKeywords', 'array-contains', lowercasedTerm));
        const querySnapshot = await getDocs(q);
        const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Post[];
        return posts;
    }, []);

    return <AuthContext.Provider value={{ getAllPosts, getPostById, getTotalDocumentCount, getTotalPages, fetchPostsForPage, fetchPostsBySearchTerm, cachedPosts }}>{children}</AuthContext.Provider>
}