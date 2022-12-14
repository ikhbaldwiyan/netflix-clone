import React, { useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { HiDocumentSearch } from 'react-icons/hi'
import { Movie } from "../types"
import Thumbnail from "./Thumbnail"
import { TbMovieOff } from "react-icons/tb"

interface Props {
  title: string
  movies: Movie[]
  modal: boolean
  setModal: Function
  setModalMovie: Function
  modalMovie: any
  searchResult?: string
}

function Row({ title, movies, modal, modalMovie, setModal, setModalMovie, searchResult }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const modalProps = {
    modal,
    modalMovie,
    setModal,
    setModalMovie
  }

  const handleClick = (direction: string) => {
    setIsMoved(true);

    if(rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current

      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth

      rowRef.current.scrollTo({left: scrollTo, behavior: 'smooth'})

    }
  }

  return (
    <div className="h-40 space-y-0.5">
      <h2 className="w-full cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {searchResult && (
          <HiDocumentSearch className="hidden h-6 w-6 sm:inline mb-1 mr-2" />
        )}
        {title} {searchResult && (
          <span className="font-light">{searchResult}</span>
        )}
      </h2>
      {searchResult && movies.length === 0 && (
        <div className="py-6 px-1">
            <div className='flex space-x-3'>
              <TbMovieOff size={40} />
              <h1 className='text-2xl'>Movies Not Found</h1>
            </div>
        </div>
      )}
      <div className="group relative md:-ml-2">
        <FaChevronLeft 
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${!isMoved && "hidden"}`} 
          onClick={() => handleClick("left")}
        />
        
        <div ref={rowRef} className="flex scrollbar-hide items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2">
          {movies.map((movie) => (
            <Thumbnail key={movie.id}  movie={movie} {...modalProps} />
          ))}
        </div>
        
        <FaChevronRight 
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  )
}

export default Row