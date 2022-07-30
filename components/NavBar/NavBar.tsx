import React, { Fragment } from "react";
import styles from './NavBar.module.css';
import { useRouter } from "next/router";
import Image from 'next/image';

const NavBar = () => {

    const router = useRouter();

    function NavigateHome(): void {
        router.push('/')
    }

    function NavigateAbout(): void {
        router.push('/about-us');
    }

    function NavigateContact(): void {
        router.push('/contact');
    }

    function NavigatePosts(): void {
        router.push('/posts');
    }

    return(
        <Fragment>
            <div className={styles.main}>
                <div className={styles.logo}>
                    {/* <h3 onClick={NavigateHome}>Half Caf Blog</h3> */}
                    <Image className={styles.logoIcon} onClick={NavigateHome} src={"/logo.jpg"} width={110} height={110} alt='logo'/>
                </div>
                <div className={styles.links}>
                    <h3 onClick={NavigateAbout}>About Us</h3>
                    <h3 onClick={NavigateContact}>Contact</h3>
                    <h3 onClick={NavigatePosts}>Blog Posts</h3>
                </div>
            </div>
        </Fragment>
    )
}

export default NavBar;