import React from 'react'
import axios from '../utils/axios'
import { useEffect, useState } from 'react'
import Topnav from './partial/Topnav'
import Card from './partial/Card'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import Loader from "./partial/Loader";
import LoadingSpinner from './partial/Loader'
function People() {
    const [person, setPerson] = useState([])
    const [page, setpage] = useState(1)
    const navigate = useNavigate()
  
    document.title = "CineVerse | People"
  
   const GetMovie = async ()=>{
     try {
      const {data} = await axios.get(`/person/popular?page=${page}`)
      if(data.results.length>0){
        console.log(data.results)
          setPerson((prev)=>[...person,...data.results])
          setpage(page + 1)
  
      }else{
  
      }
     } catch (error) {
      console.error(error);
     }
   }
  
   const refreshHandler = ()=>{
      if(person.length === 0){
          GetMovie()
      }
      else{
          setpage(1)
          setPerson([])
          GetMovie()
      }
   }
  
  
  useEffect(()=>{
      refreshHandler()
  },[])


  return person ? (
    <div className="h-full  w-full items-center bg-[#1f1E24] p-10">
    <div className="flex gap-3 items-center ">
      <h1 className="text-2xl font-semibold text-zinc-500 flex w-[1%] ">
        {" "}
        <i
          onClick={() => navigate(-1)}
          class="ri-arrow-left-line hover:text-[#6556cd] flex"
        ></i>{" "}
        People
      </h1>
      <Topnav />
     
    </div>
    <InfiniteScroll
      dataLength={person.length}
      next={GetMovie}
      hasMore={true}
      className="pl-10 mt-5"
      loader={<LoadingSpinner />}
    >
      <Card data={person} title={"people"} />
    </InfiniteScroll>
  </div>
) : (
  <Loader />
);
  
  
}

export default People