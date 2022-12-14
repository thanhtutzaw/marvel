import { Header } from '../components/Header/Header';
import { MovieList } from '../components/movie'
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const fetchAPI = async (apiURL) => {
  const resp = await fetch(`${apiURL}`)
  const data = await resp.json()
  return data
}

export async function getStaticProps() {

  const movies = await fetchAPI("https://mcuapi.herokuapp.com/api/v1/movies")
  const quotes = await fetchAPI("https://superhero-quotes.herokuapp.com/grab?banner=mcu&size=1")

  return {
    props: { Movies: movies.data, Quotes: quotes }
  }
}

export default function Home({ Movies, Quotes }) {
  // console.log(typof(Movies) , Movies)
  return (
    <>
      <Head>
        <title>Marvel Fandom</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header Quotes={Quotes} />
        {/* {JSON.stringify(Quotes)} */}
        <select>
          <option>Latest</option>
          <option>Chronology</option>
        </select>

        <MovieList Movies={Movies} />


      </main>


   </>
  )
}
