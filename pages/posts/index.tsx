import React, { Fragment, useState, useEffect, useRef } from "react";
import BlogCard from "../../components/BlogCard/BlogCard";
import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/NavBar/Navigation";
import styles from './posts.module.css';
import Title from "../../components/Title/Title";
import { BsSearch } from 'react-icons/bs';
import { fetcher } from "../../lib/api";
import useSWR from "swr";
import { Link } from 'react-scroll'
import Head from "next/head";

export async function getStaticProps() {

  const res = await fetch('https://half-caf-blog.herokuapp.com/api/posts?fields=title,cardText,createdAt&sort=id:desc&populate[category][fields][0]=name&pagination[page]=1&pagination[pageSize]=6&populate[cardPhoto][fields][0]=url');
  const postData = await res.json();

  return {
    props: {postData},
  }
}

export type PostInfo = {
  id: number,
  attributes: {
    title: string,
    cardText: string,
    createdAt: string,
    category: {
        data: {
            id: number,
            attributes: {
                name: string
            }
        }
    },
    cardPhoto: {
      data: {
        id: number,
        attributes: {
          url: string
        }
      }
    }
  }
}

type BlogData = {
  data: PostInfo[],
  meta: {
    pagination: {
      page: number,
      pageSize: number,
      pageCount: number,
      total: number
    }
  }
}
  
  const BlogPosts: React.FC<{postData: BlogData}> = ({postData}) => {

    const [searchTerm, setSearchTerm] = useState<string>(''); //Responsible for storing the search term
    const [searchResults, setSearchResults] = useState<any>([]);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [pageNumber, setPageNumber] = useState<number>(1); //Responsible for storing the page number
    const inputRef = useRef<HTMLInputElement>(null);

    //Creates the different page numbers
    let pages: any = [];
    (function createPages(): void {
      for(let i = 1; i <= postData.meta.pagination.pageCount; i++) {
        pages.push(i);
      }
    })();

    //Function for fetching Data based on search query
    function getDataFromSearch(term: string): void {
      const fetchSearchData = async () => {
        const res = await fetch(`https://half-caf-blog.herokuapp.com/api/posts?populate=cardPhoto,category&filters[title][$containsi]=${term}`);
        const data = await res.json();

        setIsSearching(true);
        setSearchResults(data.data);
      }
      fetchSearchData();
    }

    // Responsible for listening to every search term and carrying out a request to fetch appropriate data
    useEffect(() => {
      if(searchTerm.length === 0 && inputRef.current?.value.length === 0) {
        setIsSearching(false);
      } else {
        const timer = setTimeout(() => {
          if(searchTerm === String(inputRef.current?.value)){
            getDataFromSearch(searchTerm);
          }
        }, 500);
        return () => {
          clearTimeout(timer);
        }
      }
    }, [searchTerm, inputRef]);

    // Responsible for listening to every time a user wants to navigate to a different page
    const { data } = useSWR(`https://half-caf-blog.herokuapp.com/api/posts?fields=title,cardText,createdAt&sort=id:desc&populate[category][fields][0]=name&pagination[page]=${pageNumber}&pagination[pageSize]=6&populate[cardPhoto][fields][0]=url`, fetcher, 
      {
        fallbackData: postData
      })

    return(
      <div id="top">
        <Head>
          <title>Blog Posts</title>
          <meta name="description" content="Come check out our latest posts discussing coffee shops in and around Montreal!" />
        </Head>
        <Navigation />
        <div className={styles.contentBox}>
          <Title title='All Posts'/>
          <div className={styles.searchContainer}>
            <BsSearch className={styles.searchIcon}/>
            <input onChange={(e) => setSearchTerm(e.target.value)} 
                   value={searchTerm} 
                   placeholder="Search Post"
                   ref={inputRef}
                   type='text'/>
          </div>
          <div className={isSearching && searchResults.length === 0 ? styles.primaryBodyContainerSearch : styles.primaryBodyContainer}>
            {!isSearching && data.data.map((item: any) => 
              <BlogCard introText={item.attributes.cardText} 
                        image={item.attributes.cardPhoto.data.attributes.url} 
                        key={item.id} 
                        id={item.id} 
                        title={item.attributes.title}
                        dateCreated={item.attributes.createdAt}
                        category={item.attributes.category.data.attributes.name}/>)}
            {isSearching && searchResults.map((item: any) => 
              <BlogCard introText={item.attributes.cardText} 
                        image={item.attributes.cardPhoto.data.attributes.url} 
                        key={item.id} 
                        id={item.id} 
                        title={item.attributes.title}
                        dateCreated={item.attributes.createdAt}
                        category={item.attributes.category.data.attributes.name}/>)}
            {isSearching && searchResults.length === 0 ? <p className={styles.noResults}>Sorry nothing was found...</p> : null}
          </div>
          <div className={styles.pageNumbersContainer}>
              {pages.map((num: number) =>  <Link key={num} to="top" spy={true} smooth={true} duration={1200}><button disabled={num === pageNumber} style={{'opacity': num === pageNumber ? '1' : '0.6'}} key={num} onClick={(): void => setPageNumber(num)} className={styles.pageNumber}>{num}</button></Link>)}
          </div>
          <Footer />
        </div>
      </div>
  )
}

export default BlogPosts;