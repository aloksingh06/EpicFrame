import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partial/Topnav";
import Drop from "./partial/Drop";
import axios from "../utils/axios";
import Card from "./partial/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./partial/Loader";

function Popural() {
  const navigate = useNavigate();
  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  document.title = "CineVerse | Popular"


  const getPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);
      if (data.results.length > 0) {
        setpopular((prev) => [...prev, ...data.results]);
        setpage(page + 1);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (popular.length === 0) {
      getPopular();
    } else {
      setpage(1);
      setpopular([]);
      getPopular();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);
  return popular ? (
    <div className="h-full  w-full items-center bg-[#1f1E24] p-10">
      <div className="flex gap-3 items-center ">
        <h1 className="text-2xl font-semibold text-zinc-500 flex w-[1%] ">
          {" "}
          <i
            onClick={() => navigate(-1)}
            class="ri-arrow-left-line hover:text-[#6556cd]"
          ></i>{" "}
          Popular
        </h1>
        <Topnav />
        <Drop
          title="Category"
          option={["all", "tv", "movie"]}
          func={(e) => setcategory(e.target.value)}
        />
       
      </div>
      <InfiniteScroll
        dataLength={popular.length}
        next={getPopular}
        hasMore={true}
        className="pl-10 mt-5"
        loader={<Loader />}
      >
        <Card data={popular} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
}

export default Popural;
