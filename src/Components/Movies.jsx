import axios from '../utils/axios'
import React, { useEffect, useState } from 'react'
import Topnav from './partial/Topnav'
import Card from './partial/Card'
import InfiniteScroll from 'react-infinite-scroll-component'
import Drop from './partial/Drop'
import { useNavigate } from 'react-router-dom'
import Loader from "./partial/Loader";

function Movies() {
  const [movie, setmovie] = useState([])
  const [category, setcategory] = useState("now_playing")
  const [page, setpage] = useState(1)
  const navigate = useNavigate()

  document.title = "CineVerse | Movies"

 const GetMovie =async ()=>{
   try {
    const {data} = await axios.get(`/movie/${category}?page=${page}`)
    if(data.results.length>0){
        setmovie((prev)=>[...prev,...data.results])
        setpage(page + 1)

    }else{

    }
   } catch (error) {
    console.error(error);
   }
 }

 const refreshHandler = ()=>{
    if(movie.length === 0){
        GetMovie()
    }
    else{
        setpage(1)
        setmovie([])
        GetMovie()
    }
 }


useEffect(()=>{
    refreshHandler()
},[category])

  return(
    <div className="h-full  w-full items-center bg-[#1f1E24] p-10">
    <div className="flex gap-3 items-center ">
      <h1 className="text-2xl font-semibold text-zinc-500 flex w-[1%] ">
        {" "}
        <i
          onClick={() => navigate(-1)}
          class="ri-arrow-left-line hover:text-[#6556cd]"
        ></i>{" "}
        Movie
      </h1>
      <Topnav />
      <Drop
        title="Category"
        option={["popular","top_rated","upcoming","now_playing"]}
        func={(e) => setcategory(e.target.value)}
      />
     
    </div>
    <InfiniteScroll
      dataLength={movie.length}
      next={GetMovie}
      hasMore={true}
      className="pl-10 mt-5"
      loader={<Loader />}
    >
      <Card data={movie} title={"movies"}/>
    </InfiniteScroll>
  </div>
) 
  
}

export default Movies