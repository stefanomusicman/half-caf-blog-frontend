import styles from './RecentPosts.module.css';
import Title from '../../Title/Title';
import BlogCard from '../../BlogCard/BlogCard';
import { useEffect, useState } from 'react';
import { IBlogCard } from '../../../types/blog';
import SanityService from '../../../services/SanityService';

const RecentPosts = () => {
    const [posts, setPosts] = useState<IBlogCard[]>([]);

    useEffect(() => {
        async function fetchData() {
          console.log('Fetching data for page');
          const fetchedPosts = await SanityService.getTwoLatestArticlesForBlogCards();
          setPosts(fetchedPosts);
        }
    
        fetchData();
      }, []);

    return (
        <div className={styles.contentBox}>
            <Title title="Recent Posts" />
            <div className={styles.primaryBodyContainer}>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <BlogCard
                            key={post._id}
                            _id={post._id}
                            title={post.title}
                            mainImage={post.mainImage}
                            _createdAt={post._createdAt}
                            bodyText={post.bodyText}
                            categoryTitle={post.categoryTitle}
                        />
                    ))
                ) : (
                    <p>No recent posts available.</p>
                )}
            </div>
        </div>
    )
}

export default RecentPosts;