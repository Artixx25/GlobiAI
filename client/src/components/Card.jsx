import React from 'react'

import { download } from '../assets'
import { downloadImage } from '../utils'
import { SlSizeFullscreen } from 'react-icons/sl'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setPost } from '../state'
import { motion } from 'framer-motion'
import { fadeIn } from '../utils/motion';

export const Like = ({is, func}) => {
    const navigate = useNavigate();
      return (
      <button type='button' onClick={() => func == null ? navigate('/login') : func()} className='border border-[#ffffff5c] outline-none bg-[#00000048] absolute z-[7] top-3 right-3 backdrop-blur-xl p-1 rounded-xl'>
        {!is ? <AiOutlineHeart className='w-[26px] h-[26px] text-white' /> : <AiFillHeart className='w-[26px] h-[26px] text-[#ff5b5b]' /> }
      </button>
    )
  }


const Card = (values) => {
  const {prompt, _id, photo, postUserId, userImage, username, page, likes, index} = values;
  const creator = {postUserId, username,  userImage}
  const loggedInUserId = useSelector(state => state.user)
  const token = useSelector(state => state.token)
  const dispatch = useDispatch()
  const currentID = loggedInUserId !== null && loggedInUserId._id

  const isLiked = Boolean(likes[currentID]);
  const likeCount = Object.keys(likes).length;
  
  let patchLike;

  if(loggedInUserId !== null) {
    patchLike = async () => {
      const response = await fetch(`http://localhost:8080/api/v1/post/${_id}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId._id }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    };
  }


  return (
    <motion.div variants={fadeIn("right", "spring", index * 0.25, 0.5)} className='rounded-xl group relative card z-[5] cardItem'>
      <img src={photo} className='w-full h-auto object-cover rounded-xl' alt="prompt"/>
      {page === 'Profile' ? <></> : (
        <Like is={isLiked} func={loggedInUserId !== null ? patchLike : null}/>
      )}

      <div className='flex-col max-h-[94.5%] border-[1px] border-[#ffffff40] absolute bottom-0 left-0 right-0 bg-[#ffffff1c] m-2 p-4 rounded-md z-[5] textBlock backdrop-blur-xl'>
        <p className='text-white text-md overflow-y-auto prompt'>{prompt}</p>
        <div className='mt-5 flex justify-between items-center gap-2'>
          <Link to={`/profile/${creator.postUserId}`} className='flex items-center gap-2'>
            <img className='w-7 h-7 rounded-full object-cover' src={creator.userImage} alt="Creator Avatar" />
            <p className='text-white text-sm'>{creator.username}</p>
          </Link>
          <div className='flex items-center gap-3'>
            <div className='flex items-center text-white gap-1'>
              <AiFillHeart className='w-[26px] h-[26px] text-[#ff5b5b]'/>
              <p>{likeCount}</p>
            </div>
            <button type='button' onClick={() => downloadImage(_id, photo)} className='outline-none bg-transparent border-none'>
              <img src={download} alt="download" className='w-6 h-6 object-contain invert' />
            </button>
            <a href={photo} type='button' target='_blank' className='outline-none bg-transparent border-none'>
              <SlSizeFullscreen className='w-[21px] h-[21px] text-white' />
            </a>
          </div>

        </div>
      </div>
    </motion.div>
  )
}

export default Card