import styles from './Title.module.css';

const Title:React.FC<{title: string}> = ({title}) => {
    return(
        <div className={styles.titleBox}>
            <svg className={styles.svg} width='198' height='32' viewBox='0 0 298 32' fill='red' xmlns='http://www.w3.org/2000/svg'><path d='M1 17.1944C62.6418 7.28318 174.478 -8.49028 296 27' stroke='%23F6BFB3' strokeWidth='9' /></svg>
            <h1>{title}</h1>
        </div>
    )
}

export default Title;