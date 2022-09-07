import Image from "next/image"
import React from 'react'
import { imageUrl } from "../constants/movie"
import { Modal } from "../types"

function Thumbnail({ movie, modal, setModal, setModalMovie }: Modal) {

  const handleModal = () => {
    setModal(!modal)
    setModalMovie(movie)
  }

  return (
    <div onClick={handleModal} className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] lg:hover:scale-110 hover:shadow-lg">
      <Image 
        src={`${imageUrl}${movie?.backdrop_path || movie?.poster_path}`}
        layout="fill"
        className="rounded-sm object-cover md:rounded"
      />
    </div>
  )
}

export default Thumbnail