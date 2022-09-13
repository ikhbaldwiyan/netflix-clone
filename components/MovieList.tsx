import React from 'react'
import { Movie } from "../types"
import { TbMovieOff } from "react-icons/tb"
import { imageUrl } from "../constants/movie"
import Image from "next/image"

interface Props {
  title: string
  movies: Movie[]
  modal: boolean
  setModal: Function
  setModalMovie: Function
  modalMovie: any
  searchResult?: string
}

function MovieList({ title, movies, modal, setModal, setModalMovie, searchResult }: Props) {

  const handleModal = (movie: any) => {
    setModal(!modal)
    setModalMovie(movie)
  }

  return (
    <div className="h-40">
      <h2 className="w-full cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl mb-4">
        {title}
      </h2>
      {searchResult && movies.length === 0 && (
        <div className="py-6 px-1">
            <div className='flex space-x-3'>
              <TbMovieOff size={40} />
              <h1 className='text-2xl'>Movies Not Found</h1>
            </div>
        </div>
      )}
      <div className="group w-full md:-ml-2 ">
        <div className="columns-4 md:p-2 space-y-4">
          {movies.map((movie) => (
             <div onClick={() => handleModal(movie)} className="relative h-28 cursor-pointer transition duration-200 ease-out md:h-40 md:min-w-[150px] lg:hover:scale-110 hover:shadow-lg">
              <Image 
                src={`${imageUrl}${movie?.backdrop_path || movie?.poster_path}`}
                layout="fill"
                className="rounded-sm object-cover md:rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieList