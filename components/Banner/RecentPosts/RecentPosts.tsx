import styles from './RecentPosts.module.css';
import Title from '../../Title/Title';
import BlogCard from '../../BlogCard/BlogCard';
import { Post } from '../../../types/Post';
import { useAuthContext } from '../../../firebase/useAuthContext';
import { useEffect, useState } from 'react';

const RecentPosts = () => {
    const { getAllPosts } = useAuthContext();
    const [data, setData] = useState<Post[]>([]);

    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const posts = await getAllPosts();
                setData(posts);
                console.log('POSTS', posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchAllPosts();
    }, [getAllPosts]);

    const createdAt = data[0]?.createdAt;
    const date = createdAt ? createdAt.toDate() : new Date();
    const formattedDate = date.toLocaleDateString();

    const createdAt2 = data[1]?.createdAt;
    const date2 = createdAt2 ? createdAt2.toDate() : new Date();
    const formattedDate2 = date2.toLocaleDateString();

    return (
        <div className={styles.contentBox}>
            <Title title="Recent Posts" />
            <div className={styles.primaryBodyContainer}>
                {data.length > 0 ? (
                    <>
                        <BlogCard
                            introText={data[0].introText}
                            image={data[0].heroImage}
                            key={data[0].id}
                            id={data[0].id}
                            title={data[0].title}
                            dateCreated={formattedDate2}
                            category={data[0].category}
                        />
                        <BlogCard
                            introText={data[1].introText}
                            image={data[1].heroImage}
                            key={data[1].id}
                            id={data[1].id}
                            title={data[1].title}
                            dateCreated={formattedDate}
                            category={data[1].category}
                        />
                    </>
                ) : (
                    <p>No recent posts available.</p>
                )}
            </div>
        </div>
    )
}

export default RecentPosts;