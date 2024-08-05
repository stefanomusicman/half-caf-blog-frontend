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

    return (
        <div className={styles.contentBox}>
            <Title title="Recent Posts" />
            <div className={styles.primaryBodyContainer}>
                {data.length > 0 ? (
                    <BlogCard
                        introText={data[0].introText}
                        image={data[0].heroImage}
                        key={data[0].id}
                        id={data[0].id}
                        title={data[0].title}
                        dateCreated={data[0].createdAt}
                        category={data[0].category}
                    />
                ) : (
                    <p>No recent posts available.</p>
                )}
                {/* <BlogCard introText={data[1].attributes.cardText}
                        image={data[1].attributes.cardPhoto.data.attributes.url}
                        key={data[1].id}
                        id={data[1].id} 
                        title={data[1].attributes.title}
                        dateCreated={data[1].attributes.createdAt}
                        category={data[1].attributes.category.data.attributes.name}/> */}
            </div>
        </div>
    )
}

export default RecentPosts;