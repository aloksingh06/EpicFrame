import React, { useEffect, useState } from "react";
import Sidebar from "./partial/Sidebar";
import Topnav from "./partial/Topnav";
import axios from "../utils/axios";
import Header from "./partial/Header";
import HorizentolCard from "./partial/HorizentolCard";
import Drop from "./partial/Drop";
import Loader from "./partial/Loader";

function Home() {
  document.title = "CineVerse | Homepage";

  const [wallpaper, setWallpaper] = useState(null);
  const [trend, setTrend] = useState(null);
  const [category, setcategory] = useState("all");
  

  const getWallpaper = async () => {
    try {
      const { data } = await axios.get("/trending/movie/day");
      let randomdata =
        data.results[(Math.random() * data.results.length).toFixed()];
      setWallpaper(randomdata);
    } catch (error) {
      console.error(error);
    }
  };
  const trending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrend(data.results);
    } catch (error) {
      console.error(error);
    }
  };
console.log(trend)

  useEffect(() => {
    !wallpaper && getWallpaper();
    trending();
  }, [category]);

  return wallpaper && trend ? (
    <>
      
      <Sidebar />
      <div className="w-[80%] h-full overflow-x-scroll">
        <Topnav />
        <Header data={wallpaper} />

        <div className="flex justify-between p-5">
          <h1 className="text-3xl text-zinc-400 mb-3 font-semibold">
            Trending
          </h1>
          <Drop title="Filter" option={["tv", "movie", "all"]} func={(e)=>setcategory(e.target.value)} />
        </div>
        <HorizentolCard data={trend} />
      </div>
    </>
  ) : (
    <Loader />
    
  );
}

export default Home;
