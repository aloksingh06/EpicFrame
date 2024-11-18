import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partial/Topnav";
import Drop from "./partial/Drop";
import axios from "../utils/axios";
import Card from "./partial/Card";
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingSpinner from "./partial/Loader";

function Trending() {
  const navigate = useNavigate();
  const [duration, setduration] = useState("day");
  const [category, setcategory] = useState("all");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1)
  document.title = "CineVerse | Trending"
  


  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
        if(data.results.length >0){
          settrending((prev)=>[...prev,...data.results]);
          setpage(page+1)

        }
        else{
          
        }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = ()=>{
    if(trending.length===0){
      getTrending();
    }
    else{
      setpage(1)
      settrending([]);
      getTrending();
    }
  }

  useEffect(() => {
    refreshHandler()
  }, [category, duration]);
  return(
    <div className="h-full  w-full items-center bg-[#1f1E24] p-10">
      <div className="flex gap-3 items-center ">
        <h1 className="text-2xl font-semibold text-zinc-500 flex w-[1%] ">
          {" "}
          <i
            onClick={() => navigate(-1)}
            class="ri-arrow-left-line hover:text-[#6556cd]"
          ></i>{" "}
          Trending
        </h1>
        <Topnav />
        <Drop
          title="Category"
          option={["all", "tv", "movie"]}
          func={(e) => setcategory(e.target.value)}
        />
        <Drop
          title="Duration"
          option={["day", "week"]}
          func={(e) => setduration(e.target.value)}
        />
      </div >
      <InfiniteScroll
       dataLength={trending.length}
       next={getTrending}
       hasMore={true}
       className="pl-10 mt-5"
       loader={<LoadingSpinner />}
      >
        <Card data={trending} title={"trending"} />
      </InfiniteScroll>
    </div>
  ) 
}

export default Trending;
