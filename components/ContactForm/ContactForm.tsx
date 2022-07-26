import { useState } from 'react';
import styles from './ContactForm.module.css';
import { IoIosSend } from 'react-icons/io';
import { useRouter } from 'next/router';

const ContactForm = () => {

    let [name, setName] = useState<string>('');
    let [email, setEmail] = useState<string>('');
    let [message, setMessage] = useState<string>('');

    const router = useRouter();

    let isNameValid = name.trim().length > 0;
    let isEmailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    let isMessageValid = message.trim().length > 0;

    const postForm = async (name: string, email: string, message: string) => {
        const response = await fetch('https://half-caf-blog-default-rtdb.firebaseio.com/formSubmissions.json', {
            method: 'POST',
            body: JSON.stringify({
                name,
                email,
                message
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data: object = await response.json();
        console.log(data);
    }

    function formSubmissionHandler(e: any): void {
        e.preventDefault();

        if(isEmailValid && isMessageValid &&  isNameValid) {
            postForm(name, email, message);
            setEmail('');
            setMessage('');
            setName('');
            router.push('/contact/confirmed');
        } else {
            alert('Please fill out all fields');
        }
    }

    return(
        <form onSubmit={formSubmissionHandler} className={styles.form}>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write your message here" />
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email Address'/>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder='Your name here'/>
            <button type='submit'>Send {<IoIosSend className={styles.logo}/>}</button>
        </form>
    )
}

export default ContactForm;