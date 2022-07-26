import styles from './GoToPostsButton.module.css';
import { useRouter } from "next/router";

const GoToPostsButton = () => {

    const router = useRouter();

    function NavigatePosts(): void {
        router.push('/posts');
    }

    return(
        <div className={styles.main}>
            <button onClick={NavigatePosts}>View Posts</button>
        </div>
    )
}

export default GoToPostsButton;