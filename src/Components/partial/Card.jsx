import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";


function Card({ data, title }) {
  
  return (
    <div className="flex flex-wrap pl-10 w-full h-full bg-[#1f1E24] ">
      {data.map((c, i) => (
        <Link to={`/${c.media_type || title}/details/${c.id}`} className="relative w-[35vh] p-4" key={i}>
          <img
            className=" h-[40vh] object-cover shadow-[8px_17px_28px_2px_rgba(0,0,0,0.5)]"
            src={ c.poster_path || c.backdrop_path || c.profile_path ? `https://image.tmdb.org/t/p/original/${
              c.poster_path || c.backdrop_path || c.profile_path
            }`:{noimage} }
            alt=""
          />
          <h1 className="text-zinc-500 ">
            {c.title || c.original_title || c.original_name}
          </h1>
          {c.vote_average && (<div className="text-zinc-900 bg-yellow-400 w-10 h-10 flex justify-center items-center rounded-full absolute right-[10%] bottom-[20%]">
            {(c.vote_average * 10).toFixed()} <sup>%</sup>
          </div>)}
        </Link>
      ))}
    </div>
  );
}

export default Card;
