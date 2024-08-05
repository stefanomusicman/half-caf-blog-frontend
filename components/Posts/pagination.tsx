import React from "react";
import styles from '../../pages/posts/posts.module.css';
import { Link } from 'react-scroll'

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (currentPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className={styles.pageNumbersContainer}>
            {pages.map((page: number) =>
                <Link key={page} to="top" spy={true} smooth={true} duration={1200}>
                    <button disabled={page === currentPage} style={{ 'opacity': page === currentPage ? '1' : '0.6' }} key={page} onClick={(): void => onPageChange(page)} className={styles.pageNumber}>{page}</button>
                </Link>)
            }
        </div>
    )
};

export default Pagination;