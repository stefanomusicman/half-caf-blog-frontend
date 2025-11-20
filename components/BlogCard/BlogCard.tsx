import React, { Fragment } from "react";
import { useRouter } from "next/router";
import styles from './BlogCard.module.css';
import { AiOutlineCalendar } from 'react-icons/ai';
import { IBlogCard } from "../../types/blog";
import SanityImage from "../Sanity/SanityImage";
import DateHelpers from "../../helpers/date-helpers";

const BlogCard: React.FC<IBlogCard> = ({ _id, title, mainImage, _createdAt, bodyText, categoryTitle }) => {

    const router = useRouter();

    function showPostHandler() {
        router.push('/posts/' + _id)
    }

    const formattedDate = DateHelpers.formatSanityDate(_createdAt);

    return (
        <Fragment>
            <div className={styles.main}>
                <div className={styles.imageContainer}>
                    <div className={styles.whiteBackground}></div>
                    <div className={styles.imageWrapper}>
                        <SanityImage
                            alt="coffee"
                            onClick={showPostHandler}
                            src={mainImage}
                            width={1200}
                            height={800}
                            className={styles.blogImage}
                        />
                    </div>
                </div>
                <div className={styles.copyContainer}>
                    <div className={styles.firstRow}>
                        <div className={styles.date}>
                            <AiOutlineCalendar />
                            <p>{formattedDate}</p>
                        </div>
                        {/* <svg className={styles.svg} width='198' height='32' viewBox='0 0 298 32' fill='red' xmlns='http://www.w3.org/2000/svg'><path d='M1 17.1944C62.6418 7.28318 174.478 -8.49028 296 27' stroke='%23F6BFB3' strokeWidth='9' /></svg> */}
                        <p>{categoryTitle}</p>
                    </div>
                    <h2>{title}</h2>
                    <div className={styles.introText}>
                        <p>{bodyText}</p>
                    </div>
                    <button onClick={showPostHandler}>See Post</button>
                </div>
            </div>
        </Fragment>
    )
}

export default BlogCard;