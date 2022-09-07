import { Movie } from "../types"
import api from "../utils/api"

import Banner from "../components/Banner"
import Layout from "../components/Layout"
import Row from "../components/Row"

interface Props {
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
}

const Home = ({ 
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow
}: Props) => {
  return (
    <Layout>
      <Banner netflixOriginals={actionMovies} />
      <section className="space-y-4 lg:space-y-16">
        <Row title="Trending Now" movies={trendingNow} />
        <Row title="Top Rated" movies={topRated} />
        <Row title="Action Thrillers" movies={actionMovies} />
        <Row title="Comedies" movies={comedyMovies} />
        <Row title="Horror" movies={horrorMovies} />
        <Row title="Romance" movies={romanceMovies} />
        <Row title="Documentaries" movies={documentaries} />
      </section>
    </Layout>
  )
}

export default Home;

export const getServerSideProps = async () => {
  const [
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
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
