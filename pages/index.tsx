import { useState } from "react"
import { Movie } from "../types"
import api from "../utils/api"

import Banner from "../components/Banner"
import Layout from "../components/Layout"
import Row from "../components/Row"
import Modal from "../components/Modal"

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

  const [modal, setModal] = useState(false);
  const [modalMovie, setModalMovie] = useState<Movie | any>();

  const modalProps = {
    modal,
    setModal,
    modalMovie,
    setModalMovie
  }

  return (
    <Layout title="Home - Netflix Clone">
      <Banner netflixOriginals={actionMovies} {...modalProps} />
      <section className="space-y-4 lg:space-y-16">
        <Row title="Trending Now" movies={trendingNow}  {...modalProps}/>
        <Row title="Top Rated" movies={topRated} {...modalProps}/>
        <Row title="Action Thrillers" movies={actionMovies} {...modalProps}/>
        <Row title="Comedies" movies={comedyMovies} {...modalProps} />
        <Row title="Horror" movies={horrorMovies}  {...modalProps}/>
        <Row title="Romance" movies={romanceMovies}  {...modalProps}/>
        <Row title="Documentaries" movies={documentaries}  {...modalProps}/>
      </section>
      {modal && (
        <Modal {...modalProps} />
      )}
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
