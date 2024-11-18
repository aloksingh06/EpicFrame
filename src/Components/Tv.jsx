import axios from '../utils/axios'
import React, { useEffect, useState } from 'react'
import Topnav from './partial/Topnav'
import Card from './partial/Card'
import InfiniteScroll from 'react-infinite-scroll-component'
import Drop from './partial/Drop'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from './partial/Loader'
function Tv() {
    const [tv, setTv] = useState([])
    const [category, setcategory] = useState("airing_today")
    const [page, setpage] = useState(1)
    const navigate = useNavigate()
  console.log(category)
    document.title = "Movies"
  
   const GetMovie = async ()=>{
     try {
      const {data} = await axios.get(`/tv/${category}?page=${page}`)
      if(data.results.length>0){
          setTv((prev)=>[...prev,...data.results])
          setpage(page + 1)
  
      }else{
  
      }
     } catch (error) {
      console.error(error);
     }
   }
  
   const refreshHandler = ()=>{
      if(tv.length === 0){
          GetMovie()
      }
      else{
          setpage(1)
          setTv([])
          GetMovie()
      }
   }
  
  
  useEffect(()=>{
      refreshHandler()
  },[category])


  return tv ? (
    <div className="h-full  w-full items-center bg-[#1f1E24] p-10">
    <div className="flex gap-3 items-center ">
      <h1 className="text-2xl font-semibold text-zinc-500 flex w-[1%] ">
        {" "}
        <i
          onClick={() => navigate(-1)}
          class="ri-arrow-left-line hover:text-[#6556cd] flex"
        ></i>{" "}
        TVshow
      </h1>
      <Topnav />
      <Drop
        title="Category"
        option={["on_the_air","popular","top_rated","airing_today"]}
        func={(e) => setcategory(e.target.value)}
      />
     
    </div>
    <InfiniteScroll
      dataLength={tv.length}
      next={GetMovie}
      hasMore={true}
      className="pl-10 mt-5"
      loader={<LoadingSpinner />}
    >
      <Card data={tv} title={"tv"} />
    </InfiniteScroll>
  </div>
) : (
  <LoadingSpinner />
);
  
}

export default Tv