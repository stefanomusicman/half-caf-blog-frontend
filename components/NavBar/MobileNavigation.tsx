import React, { useState, Fragment } from 'react';
import styles from './MobileNavigation.module.css';
import { useRouter } from 'next/router';
import { GiHamburgerMenu } from 'react-icons/gi';
import { ImCancelCircle } from 'react-icons/im';
import Image from 'next/image';

const MobileNavigation = () => {

    const [isToggled, setIsToggled] = useState<boolean>(true);

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
                    <Image className={styles.logoIcon} onClick={NavigateHome} src={"/logo.jpg"} width={75} height={75} alt='icon'/>
                    {isToggled && <GiHamburgerMenu onClick={() => setIsToggled(!isToggled)} className={styles.hamburger}/>}
                    {!isToggled && <ImCancelCircle onClick={() => setIsToggled(!isToggled)} className={styles.hamburger}/>}
                </div>
                {!isToggled && <div className={styles.links}>
                    <h3 onClick={NavigateAbout}>About Us</h3>
                    <h3 onClick={NavigateContact}>Contact</h3>
                    <h3 onClick={NavigatePosts}>Blog Posts</h3>
                </div>}
            </div>
        </Fragment>
    )
}

export default MobileNavigation;