import React, { useState, useEffect, useRef } from "react";
import BlogCard from "../../components/BlogCard/BlogCard";
import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/NavBar/Navigation";
import styles from './posts.module.css';
import Title from "../../components/Title/Title";
import Head from "next/head";
import Pagination from "../../components/Posts/pagination";
import { IBlogCard } from "../../types/blog";
import SanityService from "../../services/SanityService";

const BlogPosts = () => {

  const [searchTerm, setSearchTerm] = useState<string>(''); //Responsible for storing the search term
  const [searchResults, setSearchResults] = useState<any>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1); //Responsible for storing the page number
  const [allPosts, setAllPosts] = useState<IBlogCard[]>([]);
  const [posts, setPosts] = useState<IBlogCard[]>([]);
  const postsPerPage = 6;

  //Creates the different page numbers and fetches the data based on current page
  useEffect(() => {
    async function fetchData() {
      console.log('Fetching data for page');
      const fetchedPosts = await SanityService.getArticlesForBlogCards();
      setAllPosts(fetchedPosts);
      
      // Calculate total pages
      const total = Math.ceil(fetchedPosts.length / postsPerPage);
      setTotalPages(total);
    }

    fetchData();
  }, []);

  // Update displayed posts when page changes
  useEffect(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const paginatedPosts = allPosts.slice(startIndex, endIndex);
    setPosts(paginatedPosts);
  }, [currentPage, allPosts]);

  //Function for fetching Data based on search query
  // function getDataFromSearch(term: string): void {
  //   const fetchSearchData = async () => {
  //     const data = await fetchPostsBySearchTerm(term);

  //     setIsSearching(true);
  //     setSearchResults(data);
  //   }
  //   fetchSearchData();
  // }

  // Responsible for listening to every search term and carrying out a request to fetch appropriate data
  // useEffect(() => {
  //   if (searchTerm.length === 0 && inputRef.current?.value.length === 0) {
  //     setIsSearching(false);
  //   } else {
  //     const timer = setTimeout(() => {
  //       if (searchTerm === String(inputRef.current?.value)) {
  //         getDataFromSearch(searchTerm);
  //       }
  //     }, 500);
  //     return () => {
  //       clearTimeout(timer);
  //     }
  //   }
  // }, [searchTerm, inputRef]);

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
          {!isSearching && posts.map((post: IBlogCard) =>
            <BlogCard
              key={post._id}
              _id={post._id}
              title={post.title}
              mainImage={post.mainImage}
              _createdAt={post._createdAt}
              bodyText={post.bodyText}
              categoryTitle={post.categoryTitle}
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