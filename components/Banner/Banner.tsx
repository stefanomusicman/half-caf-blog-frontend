import SVG from "./SVG";
import styles from './Banner.module.css';
import RecentPosts from "./RecentPosts/RecentPosts";
import React from "react";
import Image from "next/image";
import { FaCoffee, FaMapMarkerAlt, FaStar, FaHeart } from 'react-icons/fa';

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
            <div className={styles.aboutSection}>
                <Image 
                    src="/mtl-landscape.jpg" 
                    alt="Montreal landscape" 
                    className={styles.landscapeImage}
                    width={1200}
                    height={600}
                />
                <div className={styles.aboutText}>
                    <p className={styles.quote}>
                        Beneath the cobblestones and gleaming glass, a city breathes coffee.
                    </p>
                    <p className={styles.description}>
                        Montreal is a symphony of neighbourhoods, each with its own rhythm and aroma. In the steam rising from an espresso cup, you&apos;ll find the stories of artists, students, dreamers, and entrepreneurs. This blog is our love letter to the city&apos;s vibrant café culture—a guide to the cozy corners, the perfect pour-overs, and the buttery croissants that make Montreal a true coffee lover&apos;s paradise. Join us as we explore one cup at a time.
                    </p>
                </div>
            </div>
            <div className={styles.featuresGrid}>
                <div className={styles.gridItem}>
                    <FaCoffee className={styles.gridIcon} />
                    <h3 className={styles.gridTitle}>Artisan Roasters</h3>
                    <p className={styles.gridText}>Discover Montreal&apos;s finest specialty coffee roasters, from Mile End to Old Port, where every bean tells a story.</p>
                </div>
                <div className={styles.gridItem}>
                    <FaMapMarkerAlt className={styles.gridIcon} />
                    <h3 className={styles.gridTitle}>Neighborhood Gems</h3>
                    <p className={styles.gridText}>Explore hidden cafés across Plateau, Griffintown, and beyond—each neighborhood offers its unique coffee experience.</p>
                </div>
                <div className={styles.gridItem}>
                    <FaStar className={styles.gridIcon} />
                    <h3 className={styles.gridTitle}>Honest Reviews</h3>
                    <p className={styles.gridText}>Unbiased evaluations focusing on coffee quality, atmosphere, and the authentic Montreal café culture.</p>
                </div>
                <div className={styles.gridItem}>
                    <FaHeart className={styles.gridIcon} />
                    <h3 className={styles.gridTitle}>Coffee Culture</h3>
                    <p className={styles.gridText}>Celebrate the vibrant community of baristas, roasters, and coffee enthusiasts that make Montreal special.</p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Banner;