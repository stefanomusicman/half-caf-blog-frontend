import type { NextPage } from 'next'
import React from 'react'
import Banner from '../components/Banner/Banner'
import Footer from '../components/Footer/Footer'
import Navigation from '../components/NavBar/Navigation'

export async function getStaticProps() {

  const res = await fetch('https://half-caf-blog.herokuapp.com/api/posts?fields=title,cardText,createdAt&sort=id:desc&populate[category][fields][0]=name&populate[cardPhoto][fields][0]=url');
  const data = await res.json();

  return {
    props: data,
  }
}

const Home: NextPage<{data: any}> = ({data}) => {

  return (
    <React.Fragment>
      <Navigation />
      <Banner data={data}/>
      <Footer />
    </React.Fragment>
  )
}

export default Home
