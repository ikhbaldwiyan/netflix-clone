import React, { useState } from 'react'
import { baseUrl } from "../constants/movie";
import { Movie } from "../types";
import Image from "next/image";

import MuiModal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';

import { FaPlay, FaStar } from "react-icons/fa";
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

  const ButtonPlayer = () => (
    <div className="flex space-x-4 mb-10 mt-[11rem]">
      <button className="py-2 gap-2 px-6 rounded-md flex bg-white text-black mt-10 font-semibold text-lg hover:opacity-80 shadow-lg">
        <FaPlay size={18} className="mt-1 text-black" /> Play
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
    </div>
  )

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
            <Image 
              src={`${baseUrl}${modalMovie?.backdrop_path || modalMovie?.poster_path}`}
              width={900}   
              height={400}
              objectFit="cover"
              className="rounded-t-md"
            />
          </div>
          <div className="mt-40 space-y-4">
            <ButtonPlayer />
            <h1 className="text-3xl font-bold">
              {modalMovie.title} 
            </h1>
            <h4 className="text-md mb-2 text-yellow-300 font-semibold">
              <FaStar className="inline mb-1" /> {modalMovie.vote_average}  
              <span className="text-gray-400 text-sm"> - ({modalMovie.vote_count}) Reviews</span>
            </h4>
            <p className="text-slate-300">{modalMovie.overview}</p>
          </div>
        </Box>
      </Fade>

    </MuiModal>
  )
}

export default Modal;