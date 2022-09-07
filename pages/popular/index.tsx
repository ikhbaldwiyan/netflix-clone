import React from 'react'
import { Movie } from "../../types"
import api from "../../utils/api"

import Layout from "../../components/Layout"
import Row from "../../components/Row"

interface Props {
  original: Movie[],
  topRated: Movie[],
  horror: Movie[],
}

function Popular({ original, topRated, horror }: Props) {

  return (
    <Layout title="New & Popular">
      <section className="py-24 space-y-10">
        <Row title="New Original Movies" movies={original} />
        <Row title="Popular This Weekend" movies={topRated} />
        <Row title="Popular This Month" movies={horror} />
      </section>
    </Layout>
  )
}

export default Popular;

export const getServerSideProps = async () => {
  const [ original, topRated, horror ] = await Promise.all([
    fetch(api.fetchNetflixOriginals).then((res) => res.json()),
    fetch(api.fetchTopRated).then((res) => res.json()),
    fetch(api.fetchHorrorMovies).then((res) => res.json()),
  ]);

  return {
    props: {
      original: original.results.reverse(),
      topRated: topRated.results.reverse(),
      horror: horror.results.reverse()
    }
  }
}