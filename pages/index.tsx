import Head from "next/head"
import Banner from "../components/Banner"
import Header from "../components/Header"
import Row from "../components/Row"
import { Movie } from "../types"
import api from "../utils/api"

interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
}

const Home = ({ 
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow
}: Props) => {
  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-800/10 to-[#010511] lg:h-[140vh]">
      <Head>
        <title>Home - Netflix Clone</title>
      </Head>
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-10">  
        <Banner netflixOriginals={actionMovies}  />
        <section className="space-y-4 lg:space-y-16 ">
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Horror Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>
    </div>
  )
}

export default Home;

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(api.fetchNetflixOriginals).then((res) => res.json()),
    fetch(api.fetchTrending).then((res) => res.json()),
    fetch(api.fetchTopRated).then((res) => res.json()),
    fetch(api.fetchActionMovies).then((res) => res.json()),
    fetch(api.fetchComedyMovies).then((res) => res.json()),
    fetch(api.fetchHorrorMovies).then((res) => res.json()),
    fetch(api.fetchRomanceMovies).then((res) => res.json()),
    fetch(api.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    }
  }

}
