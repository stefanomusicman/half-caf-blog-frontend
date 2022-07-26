import React, { Fragment, useState, useEffect } from "react";
import BlogCard from "../../components/BlogCard/BlogCard";
import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/NavBar/Navigation";
import styles from './posts.module.css';
import Title from "../../components/Title/Title";
import { BsSearch } from 'react-icons/bs';

export async function getStaticProps() {

  const res = await fetch('https://half-caf-blog.herokuapp.com/api/posts?fields=title,cardText,createdAt&sort=id:desc&populate[category][fields][0]=name&populate=cardPhoto&pagination[page]=1&pagination[pageSize]=6');
  const data = await res.json();

  return {
    props: {data},
  }
}
  
  const BlogPosts: React.FC<{data: any}> = ({data}) => {

    const [searchTerm, setSearchTerm] = useState<string>(''); //Responsible for storing the search term
    const [searchResults, setSearchResults] = useState<any>([]);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [posts, setPosts] = useState(data); //Responsible for storing the data being retrieved from strapi
    const [pageNumber, setPageNumber] = useState<number>(1); //Responsible for storing the page number

    //Changes the page number based on which one user clicks on and loads appropriate content
    function pageLoadHandler(page: number): void {
      setPageNumber(page);
      const fetchPageData = async () => {
        const res = await fetch(`https://half-caf-blog.herokuapp.com/api/posts?fields=title,cardText,createdAt&sort=id:desc&populate[category][fields][0]=name&populate=cardPhoto&pagination[page]=${pageNumber}&pagination[pageSize]=6`);
        const data = await res.json();
  
        setPosts(data);
      }
      fetchPageData();
    }

    //Creates the different page numbers
    let pages: any = [];
    (function createPages(): void {
      for(let i = 1; i <= posts.meta.pagination.pageCount; i++) {
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
    useEffect((): void => {
      if(searchTerm.length === 0) {
        setIsSearching(false);
      } else {
        getDataFromSearch(searchTerm);
      }
    }, [searchTerm]);

    // Responsible for listening to every time a user wants to navigate to a different page
    useEffect((): void => {
      pageLoadHandler(pageNumber);
    }, [pageNumber])

    return(
      <Fragment>
        <Navigation />
        <div className={styles.contentBox}>
          <Title title='All Posts'/>
          <div className={styles.searchContainer}>
            <BsSearch className={styles.searchIcon}/>
            <input onChange={(e) => setSearchTerm(e.target.value)} 
                   value={searchTerm} 
                   placeholder="Search Post"/>
          </div>
          <div className={styles.primaryBodyContainer}>
            {!isSearching && posts.data.map((item: any) => 
              <BlogCard introText={item.attributes.cardText} 
                        image={item.attributes.cardPhoto.data.attributes.formats.medium.url} 
                        key={item.id} 
                        id={item.id} 
                        title={item.attributes.title}
                        dateCreated={item.attributes.createdAt}
                        category={item.attributes.category.data.attributes.name}/>)}
            {isSearching && searchResults.map((item: any) => 
              <BlogCard introText={item.attributes.cardText} 
                        image={item.attributes.cardPhoto.data.attributes.formats.medium.url} 
                        key={item.id} 
                        id={item.id} 
                        title={item.attributes.title}
                        dateCreated={item.attributes.createdAt}
                        category={item.attributes.category.data.attributes.name}/>)}
          </div>
          <div className={styles.pageNumbersContainer}>
              {pages.map((num: number) =>  <div style={{'opacity': num === pageNumber ? '1' : '0.6'}} key={num} onClick={(): void => setPageNumber(num)} className={styles.pageNumber}>{num}</div>)}
          </div>
          <Footer />
        </div>
      </Fragment>
  )
}

export default BlogPosts;