import React, { useState, useEffect, useRef } from "react";
import BlogCard from "../../components/BlogCard/BlogCard";
import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/NavBar/Navigation";
import styles from './posts.module.css';
import Title from "../../components/Title/Title";
import Head from "next/head";
import { useAuthContext } from "../../firebase/useAuthContext";
import { Post } from "../../types/Post";
import Pagination from "../../components/Posts/pagination";
import DateHelpers from "../../helpers/date-helpers";
import { DocumentSnapshot } from "firebase/firestore";

const BlogPosts = () => {

  const [searchTerm, setSearchTerm] = useState<string>(''); //Responsible for storing the search term
  const [searchResults, setSearchResults] = useState<any>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { getTotalPages, fetchPostsForPage, fetchPostsBySearchTerm } = useAuthContext();
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1); //Responsible for storing the page number
  const [posts, setPosts] = useState<Post[]>([]);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);

  //Creates the different page numbers and fetches the data based on current page
  useEffect(() => {
    async function fetchData() {
      const total = await getTotalPages();
      setTotalPages(total);

      // Determine startAfterDoc for pagination
      let startAfterDoc: DocumentSnapshot | null = null;
      if (lastDoc && currentPage > 1) {
        startAfterDoc = lastDoc;
      }

      const { posts: fetchedPosts, lastVisible } = await fetchPostsForPage(startAfterDoc, 6);

      setPosts(fetchedPosts);
      setLastDoc(lastVisible);
    }

    fetchData();
  }, [currentPage, getTotalPages, fetchPostsForPage, lastDoc]);

  //Function for fetching Data based on search query
  function getDataFromSearch(term: string): void {
    const fetchSearchData = async () => {
      const data = await fetchPostsBySearchTerm(term);

      setIsSearching(true);
      setSearchResults(data);
    }
    fetchSearchData();
  }

  // Responsible for listening to every search term and carrying out a request to fetch appropriate data
  useEffect(() => {
    if (searchTerm.length === 0 && inputRef.current?.value.length === 0) {
      setIsSearching(false);
    } else {
      const timer = setTimeout(() => {
        if (searchTerm === String(inputRef.current?.value)) {
          getDataFromSearch(searchTerm);
        }
      }, 500);
      return () => {
        clearTimeout(timer);
      }
    }
  }, [searchTerm, inputRef]);

  return (
    <div id="top">
      <Head>
        <title>Blog Posts</title>
        <meta name="description" content="Come check out our latest posts discussing coffee shops in and around Montreal!" />
      </Head>
      <Navigation />
      <div className={styles.contentBox}>
        <Title title='All Posts' />
        {/* TEMPORARILY DISABLE SEARCH FEATURE FOR THE TIME BEING */}
        {/* <div className={styles.searchContainer}>
          <BsSearch className={styles.searchIcon} />
          <input onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            placeholder="Search Post"
            ref={inputRef}
            type='text' />
        </div> */}
        <div className={isSearching && searchResults.length === 0 ? styles.primaryBodyContainerSearch : styles.primaryBodyContainer}>
          {!isSearching && posts.map((post: Post) =>
            <BlogCard
              introText={post.introText}
              image={post.heroImage}
              key={post.id}
              id={post.id}
              title={post.title}
              dateCreated={DateHelpers.formatFirebaseTimestamp(post.createdAt)}
              category={post.category}
            />
          )}
          {/* {isSearching && searchResults.map((post: Post) =>
            <BlogCard
              introText={post.introText}
              image={post.heroImage}
              key={post.id}
              id={post.id}
              title={post.title}
              dateCreated={DateHelpers.formatFirebaseTimestamp(post.createdAt)}
              category={post.category}
            />
          )} */}
          {isSearching && searchResults.length === 0 ? <p className={styles.noResults}>Sorry nothing was found...</p> : null}
        </div>
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
        <Footer />
      </div>
    </div>
  )
}

export default BlogPosts;