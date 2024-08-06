import { Timestamp } from 'firebase/firestore';

export type Post = {
    id: string;
    title: string;
    introText: string;
    espressoReview: string;
    milkDrinkReview: string;
    locationReview: string;
    finalVerdict: string;
    heroImage: string;
    secondImage: string;
    searchKeywords: string[];
    createdAt: Timestamp;
    category: string;
}