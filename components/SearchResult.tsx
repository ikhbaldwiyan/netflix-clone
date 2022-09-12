import React, { useEffect, useState } from 'react'
import { Movie } from '../types';
import Modal from './Modal';
import Row from './Row';

function SearchResult({ result, movies, pages }: any) {
  const [modal, setModal] = useState(false);
  const [modalMovie, setModalMovie] = useState<Movie | any>();
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);

  const modalProps = {
    modal,
    setModal,
    modalMovie,
    setModalMovie
  }
  
  useEffect(() => {
    async function getSearchMovies() {
      const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${
        process.env.NEXT_PUBLIC_API_KEY
      }&language=en-US&query=${result}&page=${page}&include_adult=false`)
      .then((response) => response.json())
      pages > 1 && setPage(2)
      data.results && result && setMovie(data.results)
    }

    getSearchMovies();

  }, [result, page])

  return (
    <main className="relative pl-4 lg:space-y-24 lg:pl-10">
      <section className="py-24 space-y-10">
        <Row title="Search Result for" movies={movies} searchResult={result} {...modalProps} />
        {page > 1 && (
          <Row title="" movies={movie} {...modalProps} />
        )}
      </section>
      {modal && (
        <Modal {...modalProps} />
      )}
    </main>

  )
}

export default SearchResult