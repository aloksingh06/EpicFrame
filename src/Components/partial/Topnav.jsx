import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";

function Topnav() {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);
  const search = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
    
      setSearches(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    search();
  }, [query]);

  return (
    <div className="w-full h-[10vh] flex justify-start pl-64 items-center relative">
      <i class="text-zinc-400 text-xl ri-search-line"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-[40%] mx-10 border-none outline-none text-lg text-white bg-transparent"
        type="text"
        placeholder="Search anythink"
      />
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="text-zinc-400 text-xl ri-close-line"
        ></i>
      )}

      <div className=" z-[100] bg-zinc-300  w-[50%] max-h-[50vh] absolute top-[100%] overflow-auto">
        {searches &&
          searches.map((s, i) => (
            <Link to={`/${s.media_type}/details/${s.id}`} key={i} className="hover:text-black hover:bg-zinc-200 font-semibold inline-block w-full p-5 flex justify-start items-center border-2 border-zinc-100 text-zinc-600">
              <img
                className="w-[6vh] h-[6vh] object-cover rounded mr-5"
                src={
                  s.backdrop_path ||
                  s.profile_path ? `https://image.tmdb.org/t/p/original/${
                    s.backdrop_path || s.profile_path
                  }`: noimage
                }
                alt=""
              />
              <span>
                {s.title || s.name || s.original_name || s.original_title}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Topnav;
