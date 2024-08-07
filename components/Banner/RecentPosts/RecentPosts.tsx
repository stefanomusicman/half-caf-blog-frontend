import styles from './RecentPosts.module.css';
import Title from '../../Title/Title';
import BlogCard from '../../BlogCard/BlogCard';
import { Post } from '../../../types/Post';
import { useAuthContext } from '../../../firebase/useAuthContext';
import { useEffect, useState } from 'react';
import DateHelpers from '../../../helpers/date-helpers';

const RecentPosts = () => {
    const { getAllPosts } = useAuthContext();
    const [data, setData] = useState<Post[]>([]);

    useEffect(() => {
        console.log('FETCHING DATA FOR RECENT POSTS');
        const fetchAllPosts = async () => {
            try {
                const posts = await getAllPosts();
                setData(posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchAllPosts();
    }, [getAllPosts]);

    const formattedDate = DateHelpers.formatFirebaseTimestamp(data[0]?.createdAt);
    const formattedDate2 = DateHelpers.formatFirebaseTimestamp(data[1]?.createdAt);

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