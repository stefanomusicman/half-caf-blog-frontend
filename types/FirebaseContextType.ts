import { Post } from "./Post";
import { DocumentSnapshot } from 'firebase/firestore';

export type FirebaseContextType = {
    getAllPosts: () => Promise<Post[]>;
    getPostById: (id: string) => Promise<Post>;
    getTotalDocumentCount: () => Promise<number>;
    getTotalPages: () => Promise<number>;
    fetchPostsForPage: (startAfterDoc: DocumentSnapshot | null, limitCount: number) => Promise<{ posts: Post[], lastVisible: DocumentSnapshot | null }>;
    fetchPostsBySearchTerm: (searchTerm: string) => Promise<Post[]>;
}