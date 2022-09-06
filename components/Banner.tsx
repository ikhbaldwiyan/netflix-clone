import Image from "next/image"
import React, { useEffect, useState } from 'react'
import { baseUrl } from "../constants/movie";
import { Movie } from "../types"
import { FaPlay } from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";

interface Props {
  netflixOriginals: Movie[]
}

function Banner({ netflixOriginals } : Props) {
  const [movie, setMovie] = useState<Movie | null>();

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.round(Math.random() * netflixOriginals.length )]
    )
  }, [netflixOriginals])
  
  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[90vh] lg:justify-end lg:pb-8">
      <div className="absolute -z-10 top-0 left-0 h-[95vh] w-screen">
        <Image 
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          layout="fill"   
          objectFit="cover"
        />
      </div>
      <div className="space-y-4">
        <h1 className="text-2xl md:text-4xl lg:text-5xl">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <p className="max-w-xs text-shadow-md text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-lg">
          {movie?.overview}
        </p>
        <div className="flex space-x-3 py-4">
          <button className="banner-btn bg-white text-black">
            <FaPlay className="h-4 w-4 text-black md:h-6 md:w-6" /> Play
          </button>
          <button className="banner-btn bg-gray-400/70">
          <IoMdInformationCircle className="h-5 w-5 md:h-8 md:w-8" /> More Info 
          </button>
        </div>
      </div>

    </div>
  )
}

export default Banner