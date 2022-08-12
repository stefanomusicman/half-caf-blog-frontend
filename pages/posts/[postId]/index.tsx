import { Fragment } from "react";
import Footer from "../../../components/Footer/Footer";
import Navigation from "../../../components/NavBar/Navigation";
import styles from './post.module.css';
import { AiOutlineCalendar } from 'react-icons/ai';
import Image from "next/image";
import Head from "next/head";

export async function getStaticPaths() {

    const res = await fetch('https://half-caf-blog.herokuapp.com/api/posts');
    const { data } = await res.json();
    const paths = data.map((post: any) => {
        return { params: { postId: post.id.toString() } }
    });

    return {
        paths: paths,
        fallback: true
    }
}

export async function getStaticProps({params}: any) {

    const id: Number = Number(params.postId);

    const res = await fetch(`https://half-caf-blog.herokuapp.com/api/posts/${id}?populate[heroImage][fields][0]=url&populate[secondImage][fields][0]=url`);
    const data = await res.json();

    return {
        props: data
    }
}

type PostData = {
    data: {
        id: number,
        attributes: {
            title: string,
            IntroText: string,
            espressoReview: string,
            locationReview: string,
            finalVerdict: string,
            cardText: string,
            milkDrinkReview: string,
            createdAt: string,
            updatedAt: string,
            publishedAt: string,
            heroImage: {
                data: {
                    id: number,
                    attributes: {
                        url: string
                    }
                }
            },
            secondImage: {
                data: {
                    id: number,
                    attributes: {
                        url: string
                    }
                }
            }
        }
    },
    meta: {}
}

const Post: React.FC<{data: any}> = ({data}) => {

    if(!data) {
        return null
    }

    const title: string = data.attributes.title;
    const intro: string = data.attributes.IntroText;
    const espressoReview: string = data.attributes.espressoReview;
    const milkDrinkReview: string = data.attributes.milkDrinkReview;
    const locationReview: string = data.attributes.locationReview;
    const finalVerdict: string = data.attributes.finalVerdict;
    const heroImage: string = data.attributes.heroImage.data.attributes.url;
    const secondImage: string = data.attributes.secondImage.data.attributes.url;
    const date: string = new Date(data.attributes.createdAt).toString().split('').slice(0,16).join('');

    return(
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
                        <div className={styles.date}>{<AiOutlineCalendar className={styles.calender}/>}{date}</div>
                    </div>
                    <img alt="coffee" className={styles.image} src={heroImage}/>
                    <div className={styles.introContainer}>
                        <p>{intro}</p>
                    </div>
                    <div className={styles.coffeeContainer}>
                        <h2>Coffee Review</h2>
                        <p>{<strong>Espresso</strong>} - {espressoReview}</p>
                        <br />
                        <p>{<strong>Milk Drink</strong>} - {milkDrinkReview}</p>
                    </div>
                    <div className={styles.locationContainer}>
                        <h2>Location Review</h2>
                        <p>{locationReview}</p>
                    </div>
                    <img alt="coffee" className={styles.image} src={secondImage}/>
                    <div className={styles.finalContainer}>
                        <p>{finalVerdict}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export default Post;