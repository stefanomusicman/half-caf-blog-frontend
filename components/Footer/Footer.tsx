import { useState } from 'react';
import styles from './Footer.module.css';
import { AiOutlineUserAdd } from 'react-icons/ai';

const Footer = () => {

    const [email, setEmail] = useState<string>('');

    const postEmail = async (mail: string) => {
        const response = await fetch('https://half-caf-blog-default-rtdb.firebaseio.com/emails.json', {
            method: 'POST',
            body: JSON.stringify(mail),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data: object = await response.json();
        console.log(data);
    }

    const submitHandler = (e: any): void => {
        e.preventDefault();

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            postEmail(email);
            setEmail('');
        } else {
            alert('Please enter a valid email');
        }
    }

    return (
        <footer className={styles.main}>
            <div className={styles.captionBox}>
                <h1>Get latest posts delivered right to your inbox</h1>
            </div>
            <form onSubmit={submitHandler} className={styles.form}>
                <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Your email address' />
                <button type='submit'>{<AiOutlineUserAdd className={styles.icon} />}Join today</button>
            </form>
            <div className={styles.copyright}>
                <h3>© 2024 Half Caf Blog. All rights reserved.</h3>
            </div>
        </footer>
    )
}

export default Footer;