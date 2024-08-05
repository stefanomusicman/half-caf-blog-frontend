import { Post } from "./Post"

export type FirebaseContextType = {
    getAllPosts: () => Promise<Post>;
}