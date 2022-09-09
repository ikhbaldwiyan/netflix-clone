import Image from "next/image"
import React, { useEffect, useState } from 'react'
import { baseUrl } from "../constants/movie";
import { Movie } from "../types"
import { FaPlay, FaStop, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";
import ReactPlayer from "react-player";
import { isMobile } from 'react-device-detect';

interface Props {
  netflixOriginals: Movie[]
  modal: boolean
  setModal: Function
  setModalMovie: Function
}

function Banner({ netflixOriginals, modal, setModal, setModalMovie } : Props) {
  const [movie, setMovie] = useState<Movie | null>();
  const [trailer, setTrailer] = useState('');
  const [played, setPlayed] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.round(Math.random() * netflixOriginals.length )]
    )
  }, [netflixOriginals])

  const handleModal = () => {
    setModal(!modal)
    setModalMovie(movie)
  }

  useEffect(() => {
    if (!movie) return

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json())

      const listTrailer: any = [];

      if (data?.videos) {
        data.videos?.results.map((item: any) => {
          if(item.type == 'Trailer') {
            listTrailer.push(item.key)
          }
        });
        const randomIndex = Math.floor((Math.random() * listTrailer.length));
        setTrailer(listTrailer[randomIndex]);
      }
    }

    fetchMovie()
  }, [trailer, movie, played])
  
  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[90vh] lg:justify-end lg:pb-8">
      <div className="absolute -z-10 top-0 left-0 h-screen w-screen">
        {trailer && played ? (
          <div>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailer}`}
              width="100%"
              height="100%"
              style={{ position: 'absolute', top: '0', left: '0' }}
              playing
              onEnded={() => setPlayed(!played)}
              muted={muted}
            />
          </div>
        ) : (
          <Image
            src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
            layout="fill"
            objectFit="cover"
            className="opacity-60"
          />
        )}
      </div>
      <div className="space-y-4">
        <h1 className="text-2xl text-shadow-lg md:text-4xl lg:text-4xl font-bold max-w-2xl">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <p className="max-w-xs text-shadow-md text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-lg">
          {movie?.overview}
        </p>
        <div className="flex w-full items-center justify-between">
          <div className="flex space-x-3 py-4">
            {!isMobile && (
              <button onClick={() => setPlayed(!played)} className="banner-btn bg-white text-black">
                {!played ? (
                  <>
                    <FaPlay className="h-4 w-4 text-black md:h-6 md:w-6" /> Play
                  </>
                ) : (
                  <>
                    <FaStop className="h-4 w-4 text-black md:h-6 md:w-6" /> Stop
                  </>
                )}
              </button>
            )}
            <button onClick={handleModal} className="banner-btn bg-gray-400/70">
              <IoMdInformationCircle className="h-5 w-5 md:h-8 md:w-8" /> More Info
            </button>
          </div>
          {played && (
            <button className="p-2 rounded-full flex bg-neutral-900 border text-black mt-10 font-semibold hover:opacity-80 mr-20" onClick={() => setMuted(!muted)}>
              {muted ? (
                <FaVolumeMute size={24} className=" text-white" />
              ) : (
                <FaVolumeUp size={25} className=" text-white" />
              )}
            </button>
          )}
        </div>
      </div>

    </div>
  )
}

export default Banner