import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Notfound from './Notfound'

function Trailer() {
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const category = pathname.includes('movie') ? "movie" : "tv";
   const ytvideo = useSelector(state=>state[category].info.videos)
   
  return (
    <div className='absolute  top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.8)] flex justify-center items-center'>
        <i 
          onClick={() => navigate(-1)}
          class="ri-close-fill absolute top-[5%] right-32 text-3xl hover:text-[#6556cd]"
        ></i>{" "}
        {ytvideo ? (
            <ReactPlayer
            controls
            height={650}
            width={1200}
              url={`https://www.youtube.com/watch?v=${ytvideo.key}`}/>
        ): (<Notfound />)}
    </div>
  )
}

export default Trailer