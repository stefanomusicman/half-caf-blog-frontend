import { Post } from "./Post"

export type FirebaseContextType = {
    getAllPosts: () => Promise<Post[]>;
    getPostById: (id: string) => Promise<Post>;
}