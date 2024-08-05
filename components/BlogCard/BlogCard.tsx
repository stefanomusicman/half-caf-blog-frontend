import React, { Fragment } from "react";
import { useRouter } from "next/router";
import styles from './BlogCard.module.css';
import { AiOutlineCalendar } from 'react-icons/ai';

const BlogCard: React.FC<{ dateCreated: string, introText: string, image: string, id: string, title: string, category: string }> = ({ id, introText, title, image, dateCreated, category }) => {

    const router = useRouter();

    function showPostHandler() {
        router.push('/posts/' + id)
    }

    return (
        <Fragment>
            <div className={styles.main}>
                <div className={styles.imageContainer}>
                    <div className={styles.whiteBackground}></div>
                    <img alt="coffee" onClick={showPostHandler} src={image} />
                </div>
                <div className={styles.copyContainer}>
                    <div className={styles.date}>
                        <p>{<AiOutlineCalendar />}{dateCreated}</p>
                        <div className={styles.categoryBox}>
                            <svg className={styles.svg} width='198' height='32' viewBox='0 0 298 32' fill='red' xmlns='http://www.w3.org/2000/svg'><path d='M1 17.1944C62.6418 7.28318 174.478 -8.49028 296 27' stroke='%23F6BFB3' strokeWidth='9' /></svg>
                            <p>{category}</p>
                        </div>
                    </div>
                    <h2>{title}</h2>
                    <div className={styles.introText}>
                        <p>{introText}</p>
                    </div>
                    <button onClick={showPostHandler}>See Post</button>
                </div>
            </div>
        </Fragment>
    )
}

export default BlogCard;