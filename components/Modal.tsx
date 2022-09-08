import React, { useEffect, useState } from 'react'
import { baseUrl } from "../constants/movie";
import { Genre, Movie } from "../types";
import Image from "next/image";
import ReactPlayer from "react-player";

import MuiModal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';

import { FaPlay, FaStar, FaStop, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { BiCheck, BiPlus } from "react-icons/bi";
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";

interface ModalProps {
  modal: boolean,
  setModal: Function,
  modalMovie: Movie,
  setModalMovie: Function,
}

function Modal({ modal, setModal, modalMovie }: ModalProps) {

  const [liked, setLiked] = useState(false);
  const [disliked, setDislaked] = useState(false);
  const [added, setAdded] = useState(false);
  const [trailer, setTrailer] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [played, setPlayed] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (!modalMovie) return

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          modalMovie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${modalMovie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json())
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        )
        setTrailer(data.videos?.results[index]?.key)
      }
      if (data?.genres) {
        setGenres(data.genres)
      }
    }

    fetchMovie()
  }, [trailer, genres])
  

  const handleClose = () => {
    setModal(false)
  }

  const handleLike = (type: string) => {
    if (type == 'like') {
      setLiked(!liked), setDislaked(false)
    } else {
      setDislaked(!disliked), setLiked(false)
    }
  }

  const handleAddList = () => {
    setAdded(!added);
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    height: '90%',
    bgcolor: 'background.paper',
    boxShadow: 40,
    p: 4,
    backgroundColor: '#141414',
    borderRadius: '8px',
    overflow:'scroll',
  };

  return (
    <MuiModal
      open={modal} 
      onClose={handleClose} 
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 800,
      }}
    >
      <Fade in={modal}>
        <Box sx={style}>
          <IoMdCloseCircle onClick={handleClose} className="cursor-pointer hover:opacity-70" size="22" />
          <div className="absolute -z-10 top-0 left-0 shadow-xl shadow-gray-800">
            {played ? (
              <>
                <Image
                  src={`${baseUrl}${modalMovie?.backdrop_path || modalMovie?.poster_path}`}
                  width={800}
                  height={450}
                  objectFit="cover"
                  className="rounded-t-md"
                />
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${trailer}`}
                  width="100%"
                  height="100%"
                  style={{ position: 'absolute', top: '0', left: '0' }}
                  playing
                  muted={muted}
                />
              </>
            ) : (
              <Image 
                src={`${baseUrl}${modalMovie?.backdrop_path || modalMovie?.poster_path}`}
                width={900}   
                height={400}
                objectFit="cover"
                className="rounded-t-md"
              />
            )}
          </div>
          <div className={`${played ? 'mt-[17.6rem]' : 'mt-40'} space-y-4`}>
            <div className="flex space-x-4 mb-10 mt-[11rem]">
              <button onClick={() => setPlayed(!played)} className="py-2 gap-2 px-6 rounded-md flex bg-white text-black mt-10 font-semibold text-lg hover:opacity-80 shadow-lg">
                {!played ? (
                  <>
                    <FaPlay size={18} className="mt-1 text-black" /> Play
                  </>
                ) : (
                  <>
                    <FaStop size={18} className="mt-1 text-black" /> Stop
                  </>
                )}
              </button>
              <button onClick={handleAddList} className="p-2 rounded-full flex bg-neutral-900 border text-black mt-10 font-semibold hover:opacity-80">
                {added ? (
                  <BiCheck size={25} className="text-white"  />
                ) : (
                  <BiPlus size={25} className="text-white" />
                )}
              </button>
              <button onClick={() => handleLike('like')} className="p-2 rounded-full flex bg-neutral-900 border text-black mt-10 font-semibold hover:opacity-80">
                {liked ? (
                  <AiFillLike size={25} className="text-white"  />
                ) : (
                  <AiOutlineLike size={25} className="text-white" />
                )}
              </button>
              <button onClick={() => handleLike('dislike')} className="p-2 rounded-full flex bg-neutral-900 border text-black mt-10 font-semibold hover:opacity-80">
                {disliked ? (
                  <AiFillDislike size={25} className="text-white" />
                ) : (
                  <AiOutlineDislike size={25} className="text-white" />
                )}
              </button>
              <button className="p-2 rounded-full flex bg-neutral-900 border text-black mt-10 font-semibold hover:opacity-80" onClick={() => setMuted(!muted)}>
                {muted ? (
                  <FaVolumeMute size={25} className=" text-white" />
                ) : (
                  <FaVolumeUp size={25} className=" text-white" />
                )}
              </button>
            </div>
            <h1 className="text-3xl font-bold">
              {modalMovie.title} 
            </h1>
          </div>
          <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
            <p className="w-4/6 text-slate-300 font-semibold py-3">{modalMovie?.overview}</p>
            <div className="flex flex-col space-y-3 text-sm">
              <h4 className="text-md mt-3 text-yellow-300 font-semibold">
                <FaStar className="inline mb-1" /> {modalMovie.vote_average}  
                <span className="text-gray-400 text-sm"> - ({modalMovie.vote_count}) Reviews</span>
              </h4>
              <div>
                <p className="text-[gray]">Genres:</p>{' '}
                {genres.map((genre) => genre.name).join(', ')}
              </div>

              <div>
                <span className="text-[gray]">Original language:</span>{' '}
                {modalMovie?.original_language}
              </div>

              <div>
                <span className="text-[gray]">Release Date:</span>{' '}
                {modalMovie?.release_date}
              </div>
            </div>
          </div>
        </Box>
      </Fade>
    </MuiModal>
  )
}

export default Modal;