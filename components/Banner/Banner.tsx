import SVG from "./SVG";
import styles from './Banner.module.css';
import RecentPosts from "./RecentPosts/RecentPosts";
import React from "react";

const Banner = () => {
    return (
        <React.Fragment>
            <div className={styles.main}>
                <div className={styles.textBox}>
                    <SVG />
                    <h1>Your one stop shop for all things <strong>coffee</strong> in the greater Montreal area!</h1>
                </div>
            </div>
            <RecentPosts />
        </React.Fragment>
    )
}

export default Banner;