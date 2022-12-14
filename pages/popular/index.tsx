import React, { useState } from 'react'
import { Movie } from "../../types"
import api from "../../utils/api"

import Layout from "../../components/Layout"
import Row from "../../components/Row"
import Modal from "../../components/Modal"

interface Props {
  original: Movie[],
  topRated: Movie[],
  horror: Movie[],
  upcoming: Movie[],
}

function Popular({ original, topRated, horror, upcoming }: Props) {

  const [modal, setModal] = useState(false);
  const [modalMovie, setModalMovie] = useState<Movie | any>();

  const modalProps = {
    modal,
    setModal,
    modalMovie,
    setModalMovie
  }

  return (
    <Layout title="New & Popular">
      <section className="py-24 space-y-10">
        <Row title="New Original Movies" movies={original} {...modalProps}/>
        <Row title="Popular This Weekend" movies={topRated} {...modalProps}/>
        <Row title="Popular This Month" movies={horror} {...modalProps}/>
        <Row title="Upcoming Movies" movies={upcoming} {...modalProps}/>
      </section>
      {modal && (
        <Modal {...modalProps} />
      )}
    </Layout>
  )
}

export default Popular;

export const getServerSideProps = async () => {
  const randomPage = Math.floor((Math.random() * 10) + 1);
  const [ original, topRated, horror, upcoming ] = await Promise.all([
    fetch(`${api.fethPopularMovies}&page=${randomPage}`).then((res) => res.json()),
    fetch(`${api.fethPopularMovies}&page=2`).then((res) => res.json()),
    fetch(`${api.fethPopularMovies}&page=14`).then((res) => res.json()),
    fetch(`${api.fethUpcomingMovies}&page=2`).then((res) => res.json()),
  ]);

  return {
    props: {
      original: original.results,
      topRated: topRated.results.reverse(),
      horror: horror.results.reverse(),
      upcoming: upcoming.results
    }
  }
}