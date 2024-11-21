import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";

function Header({ data }) {
  
  return (
    <Link 
      className="w-full h-[45vh] px-16 py-5 flex flex-col justify-end items-start "
      style={{
        background: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5),rgba(0,0,0,0.8)), Url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        }`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="text-3xl font-bold text-white ">
        {data.title || data.original_title || data.original_name}
      </h1>
      <p className="text-white w-[70%] mt-2 w-[55%]">
        {data.overview.slice(0, 200)}...
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400" >more</Link>

      </p>
      <p className="text-white mt-2 ">
        <i className="ri-clapperboard-fill text-[#6556cd] mr-1"></i>
        {data.media_type}
        <i className="ri-calendar-2-fill text-[#6556cd] ml-3 mr-1"></i>
        {data.release_date || "No Information"}
      </p>
      <Link to={`/${data.media_type || title}/details/${data.id}/trailer`}  className="px-3 py-2 mt-3 rounded bg-[#6556cd]">Watch Trailer</Link>
    </Link>
  );
}

export default Header;
