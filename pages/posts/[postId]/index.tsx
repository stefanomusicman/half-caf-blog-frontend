import { Fragment, useEffect, useState } from "react";
import Footer from "../../../components/Footer/Footer";
import Navigation from "../../../components/NavBar/Navigation";
import styles from './post.module.css';
import { AiOutlineCalendar } from 'react-icons/ai';
import Head from "next/head";
import { useAuthContext } from "../../../firebase/useAuthContext";
import { Post } from "../../../types/Post";
import { useRouter } from 'next/router';

const PostDetails: React.FC = () => {
    const router = useRouter();
    const { postId } = router.query;
    const [data, setData] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { getPostById } = useAuthContext();

    useEffect(() => {
        const fetchPost = async () => {
            if (postId) {
                try {
                    const post = await getPostById(postId as string);
                    if (post) {
                        setData(post);
                    } else {
                        setError('Post not found');
                    }
                } catch (err) {
                    setError('An error occurred while fetching the post');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchPost();
    }, [postId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!data) {
        return null;
    }

    const { title, introText, espressoReview, milkDrinkReview, locationReview, finalVerdict, heroImage, secondImage, createdAt } = data;
    const date = createdAt.toDate().toLocaleDateString();

    return (
        <Fragment>
            <Head>
                <title>{title}</title>
                <meta name="description" content={`Come read up on ${title}`} />
            </Head>
            <Navigation />
            <div className={styles.main}>
                <div className={styles.contentContainer}>
                    <div className={styles.titleContainer}>
                        <h1>{title}</h1>
                        <div className={styles.date}>
                            <AiOutlineCalendar className={styles.calender} /> {date}
                        </div>
                    </div>
                    <img alt="coffee" className={styles.image} src={heroImage} />
                    <div className={styles.introContainer}>
                        <p>{introText}</p>
                    </div>
                    <div className={styles.coffeeContainer}>
                        <h2>Coffee Review</h2>
                        <p><strong>Espresso</strong> - {espressoReview}</p>
                        <br />
                        <p><strong>Milk Drink</strong> - {milkDrinkReview}</p>
                    </div>
                    <div className={styles.locationContainer}>
                        <h2>Location Review</h2>
                        <p>{locationReview}</p>
                    </div>
                    <img alt="coffee" className={styles.image} src={secondImage} />
                    <div className={styles.finalContainer}>
                        <p>{finalVerdict}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
};

export default PostDetails;
