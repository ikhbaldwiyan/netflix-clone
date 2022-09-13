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

  const myList = useSelector(myListvalue)
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
        {myList.length ? (
          <MyLists title="List Movies" movies={myList} {...modalProps} />
        ) : (
          <p>Movies Not Found Please add it</p>
        )}
      </section>
      {modal && (
        <Modal {...modalProps} />
      )}
    </Layout>
  )
}

export default MyList