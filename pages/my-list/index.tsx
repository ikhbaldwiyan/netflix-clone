import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Layout from '../../components/Layout'
import Modal from "../../components/Modal"
import MyLists from "../../components/MovieList"

import { Movie } from "../../types"
import { MyListSuccess, myListvalue } from "../../slices/myList"

function MyList() {
  const [modal, setModal] = useState(false);
  const [modalMovie, setModalMovie] = useState<Movie | any>();

  const movies = useSelector(myListvalue)
  const dispatch = useDispatch();

  const modalProps = {
    modal,
    setModal,
    modalMovie,
    setModalMovie
  }

  useEffect(() => {
    const myListMovies = localStorage.getItem('movies') && JSON.parse(localStorage.getItem('movies') || "");
    dispatch(MyListSuccess(myListMovies))
  }, [])
  

  return (
    <Layout title="My List">
      <section className="py-24 space-y-10">
        {movies.length ? (
          <MyLists movies={movies} {...modalProps} />
        ) : (
          <div>
            <h2 className="w-full cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl mb-4">
              List Movies
            </h2>
            <p>Movies Not Found Please add it</p>
          </div>
        )}
      </section>
      {modal && (
        <Modal {...modalProps} />
      )}
    </Layout>
  )
}

export default MyList