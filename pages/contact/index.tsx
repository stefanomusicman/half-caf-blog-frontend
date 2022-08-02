import React, { Fragment } from "react";
import Navigation from "../../components/NavBar/Navigation";
import styles from './contact.module.css';
import { BsFacebook } from 'react-icons/bs';
import { BsInstagram } from 'react-icons/bs';
import Footer from "../../components/Footer/Footer";
import Title from "../../components/Title/Title";
import ContactForm from "../../components/ContactForm/ContactForm";
import Link from "next/link";

const Contact = () => {
    return(
        <Fragment>
            <Navigation />
            <div className={styles.contentBox}>
                <Title title='Contact'/>
                <div className={styles.primaryBodyContainer}>
                    <div className={styles.leftSide}>
                        <div className={styles.paragraph1}>
                            <h2>Contact Half Caf Blog</h2>
                            <p>We&apos;re here to help answer any questions you may have. Feel free to reach out with questions, business inquiries or just to chat!</p>
                        </div>
                        <div className={styles.paragraph2}>
                            <h2>Hate forms?</h2>
                            <h2>Reach out on social media!</h2>
                            <div className={styles.iconsContainer}>
                                <a target="_blank" rel="noreferrer" href="https://www.facebook.com/Half-Caf-Blog-101063532712900"><BsFacebook className={styles.facebook}/></a>
                                <a target="_blank" rel="noreferrer" href="https://www.instagram.com/halfcafblog/?hl=en"><BsInstagram className={styles.instagram}/></a>
                            </div>
                        </div>
                    </div>
                    <div className={styles.rightSide}>
                        <h2>Contact Form</h2>
                        <ContactForm />
                    </div>
                </div>
                <Footer />
            </div>
        </Fragment>
    )
}

export default Contact;