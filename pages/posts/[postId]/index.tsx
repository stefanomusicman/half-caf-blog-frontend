import { Fragment, useEffect, useState } from "react";
import Footer from "../../../components/Footer/Footer";
import Navigation from "../../../components/NavBar/Navigation";
import styles from './post.module.css';
import { AiOutlineCalendar } from 'react-icons/ai';
import Head from "next/head";
import { useRouter } from 'next/router';
import { Block, Blog } from "../../../types/blog";
import SanityService from "../../../services/SanityService";
import DateHelpers from "../../../helpers/date-helpers";
import {SanityImage as SanityImageType} from "../../../types/sanity-image";
import SanityImage from "../../../components/Sanity/SanityImage";

const PostDetails: React.FC = () => {
    const router = useRouter();
    const { postId } = router.query;
    const [article, setArticle] = useState<Blog | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchArticle = async () => {
          try {
            const article = await SanityService.getArticleById(postId as string);
            setArticle(article);
          } catch (error) {
            console.error("Error fetching article:", error);
          } finally {
            setLoading(false);
          }
        }
        fetchArticle();
    }, [postId]);

    if (loading || !article) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
            </div>
        );
    }

    const formattedDate = DateHelpers.formatSanityDate(article._createdAt);
    return (
        <Fragment>
            <Head>
                <title>{article.title}</title>
                <meta name="description" content={`Come read up on ${article.title}`} />
            </Head>
            <Navigation />
            <div className={styles.main}>
                <div className={styles.contentContainer}>
                    <div className={styles.titleContainer}>
                        <h1>{article.title}</h1>
                        <div className={styles.date}>
                            <AiOutlineCalendar className={styles.calender} /> {formattedDate}
                        </div>
                    </div>
                    {article!.body.map((item, index) => {
                  if ((item as Block)._type === 'block') {
                    const blockItem = item as Block;
                    return (
                      <div key={blockItem._key || `block-${index}`} className={styles.textBlock}>
                        <p>
                          {blockItem.children.map((child) => child.text).join('')}
                        </p>
                      </div>
                    );
                  }
                  if ((item as SanityImageType)._type === 'image') {
                    const imageItem = item as SanityImageType;
                    return (
                      <div key={`image-${index}`} className={styles.imageWrapper}>
                      <SanityImage 
                        src={imageItem} 
                        alt={article!.title} 
                        width={1200}
                        height={800}
                        className={styles.blogImage}
                      />
                      </div>
                    );
                  }
                  return null;
                })}
                </div>
            </div>
            <Footer />
        </Fragment>
    );
};

export default PostDetails;
