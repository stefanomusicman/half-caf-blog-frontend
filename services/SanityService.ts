import { createClient, SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url"
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Blog, IBlogCard } from "../types/blog";

class SanityService {
    private client: SanityClient;
    private builder: ReturnType<typeof imageUrlBuilder>

    constructor() {
        this.client = createClient({
            projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
            dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
            useCdn: true,
            apiVersion: '2025-02-06',
        })

        this.builder = imageUrlBuilder(this.client);
    }

    urlForImage(source: SanityImageSource) {
        return this.builder.image(source);
    }

    async getArticlesByCategory(categoryName: string): Promise<Blog[]> {
        try {
            const request = `
            *[_type == "post" && categories[]->title match "${categoryName}"] {
                _id,
                title,
                slug{current},
                mainImage,
                secondaryImage,
                categories[]->{
                    title
                },
                body,
                originalArticle
                }
            `;

            const articles = await this.client.fetch(request);
            return articles as Blog[];
        } catch (error) {
            console.error(`ERROR FETCHING ARTICLES OF CATEGORY ${categoryName}: `, error);
        }
        return [];
    }

    async getArticlesForBlogCards(): Promise<IBlogCard[]> {
        try {
            const request = `
                *[_type == "post"] {
                _id,
                title,
                mainImage,
                _createdAt,
                "categoryTitle": categories[0]->title,
                "bodyText": body[2].children[0].text
                }
            `;

            const blogCards = await this.client.fetch(request);
            return blogCards as IBlogCard[];
        } catch (error) {
            console.error('ERROR FETCHING ARTICLES FOR BLOG CARDS: ', error);
            return [];
        }
    }

    async getTwoLatestArticlesForBlogCards(): Promise<IBlogCard[]> {
        try {
            const request = `
                *[_type == "post"] | order(_createdAt desc) [0..1] {
                _id,
                title,
                mainImage,
                _createdAt,
                "categoryTitle": categories[0]->title,
                "bodyText": body[2].children[0].text
                }
            `;

            const blogCards = await this.client.fetch(request);
            return blogCards as IBlogCard[];
        } catch (error) {
            console.error('ERROR FETCHING ARTICLES FOR BLOG CARDS: ', error);
            return [];
        }
    }

    async getArticleById(id: string): Promise<Blog> {
        try {
            const request = `
                *[_type == "post" && _id match "${id}"] {
                    _id,
                    title,
                    _createdAt,
                    slug{current},
                    mainImage,
                    secondaryImage,
                    categories[]->{
                        title
                    },
                    body,
                    originalArticle
                }
            `;

            const article = await this.client.fetch(request);

            // Ensure the article exists
            if (!article || article.length === 0) {
                throw new Error(`Article with ID ${id} not found`);
            }

            return article[0] as Blog;
        } catch (error) {
            console.error(`ERROR FETCHING ARTICLE WITH ID ${id}: `, error);

            return {
                _id: '',
                title: 'Article Not Found',
                slug: { current: '' },
                _createdAt: '',
                mainImage: '',
                secondaryImage: '',
                categories: [],
                body: [],
                originalArticle: '',
            };
        }
    }

    async getCategoryTitles(): Promise<string[]> {
        try {
            const request = `*[_type == "category"].title`;
            const titles = await this.client.fetch(request);
            return titles as string[];
        } catch (error) {
            console.error("ERROR FETCHING CATEGORY TITLES: ", error);
            return [];
        }
    }
}

export default new SanityService();