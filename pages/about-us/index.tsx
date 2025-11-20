import React, { Fragment } from "react";
import Navigation from "../../components/NavBar/Navigation";
import styles from "./about-us.module.css";
import Image from "next/image";
import Footer from "../../components/Footer/Footer";
import Title from "../../components/Title/Title";
import Head from "next/head";

const About = () => {
    return(
        <Fragment>
            <Head>
                <title>About Us</title>
                <meta name="description" content="Learn about who we are and how we go about providing the best info for all of our readers!" />
            </Head>
            <Navigation />
            <div className={styles.contentContainer}>
                <Title title="About Us"/>
                <div className={styles.captionBox}>
                    <h2>We are <strong>Half Caf Blog</strong>, a team of passionate <strong>coffee conoisseurs.</strong></h2>
                </div>
                <div className={styles.imageContainer}>
                    <Image className={styles.image} src="/coffee2.jpg" alt="picture of coffee cup" width={650} height={350}/>
                    <Image className={styles.image} src="/coffee1.jpeg" alt="picture of coffee cup" width={350} height={310}/>
                    <Image className={styles.image} src="/coffee3.jpg" alt="picture of coffee cup" width={375} height={400}/>
                </div>
                <div className={styles.descriptionContainer}>
                    <div className={styles.paragraphOne}>
                        <p>Welcome to Half Caf Blog, a place for all things <strong>coffee</strong> within the greater <strong>Montreal</strong> Area. Here you will find a variety of content including <strong>coffee shop reviews</strong> and <strong>coffee reviews</strong>! We are a small team of people who are passionate about coffee and would like nothing more than to provide Montrealers with non-biased information for anything related to coffee.</p>
                    </div>
                    <div className={styles.paragraphTwo}>
                        <p>At Half Caf Blog, when we review anything, we don&apos;t simply focus on the overall trendiness of a product/coffee shop but we also put a lot of <strong>emphasis on the actual coffee!</strong> For instance, when we review a coffee shop, <strong>we always order two drinks</strong>, a black <strong>espresso</strong> in order to get a taste for the raw coffee being served and then a <strong>milk drink</strong> to get a taste of whether or not the milk is being heated skillfully.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export default About;