import axios from '../../utils/axios'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import noimage from "/noimage.jpg";



function Sidebar() {
   

  return (
    <div className='w-[20%] h-full border-r-2 border-zinc-200 p-10'>
        
            <h1 className='text-2xl text-white font-bold'>
            <i className="text-[#6556cd] ri-tv-fill mr-2 "></i>
                <span>MOVIE HUB</span>
            </h1>
        <nav className='flex flex-col text-lg gap-2 text-zinc-300'>
            <h1 className='text-xl text-white font-semibold mt-10 mb-5'>New Feeds</h1>
            <Link to={"/"} className='hover:bg-[#6556cd] p-4 rounded-lg duration-500 hover:text-white'> <i className="ri-home-fill mr-1"></i>Home</Link>
            <Link to={"/trending"} className='hover:bg-[#6556cd] p-4 rounded-lg duration-500 hover:text-white'> <i className="ri-fire-fill mr-1"></i>Trending</Link>
            <Link to={"/popular"} className='hover:bg-[#6556cd] p-4 rounded-lg duration-500 hover:text-white'><i className="ri-bard-fill mr-1"></i>  Popular</Link>
            <Link to={"/movies"} className='hover:bg-[#6556cd] p-4 rounded-lg duration-500 hover:text-white'><i className="ri-film-line mr-1"></i> Movies</Link>
            <Link to={"/tv"} className='hover:bg-[#6556cd] p-4 rounded-lg duration-500 hover:text-white'><i className="ri-movie-fill mr-1"></i>TV Shows</Link>
            <Link to={"/people"} className='hover:bg-[#6556cd] p-4 rounded-lg duration-500 hover:text-white'><i className="ri-team-fill mr-1"></i>People</Link>
        </nav>
        <hr className='mt-3' />
        <nav className='flex flex-col text-lg gap-3 text-zinc-300'>
            <h1 className='text-xl text-white font-semibold mt-5 mb-3'>Website Information</h1>
            <Link to={"/about"} className='hover:bg-[#6556cd] p-3 rounded-lg duration-500 hover:text-white'> <i className="ri-information-fill mr-1"></i>About</Link>
            
           
        </nav>
    </div>
  )
}

export default Sidebar