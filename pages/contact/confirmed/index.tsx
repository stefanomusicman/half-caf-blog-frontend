import styles from './formConfirmation.module.css';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BsArrowLeft } from 'react-icons/bs';
import { useRouter } from 'next/router';

const FormConfirmation = () => {

    const router = useRouter();

    return(
        <div className={styles.primary}>
            <AiOutlineCheckCircle className={styles.icon}/>
            <p>Your form has been submitted successfully! A member of our team will reach out to you shortly.</p>
            <button onClick={() => router.push('/contact')}>{<BsArrowLeft />} Back</button>
        </div>
    )
}

export default FormConfirmation;