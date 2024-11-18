import React from "react";
import { Link } from "react-router-dom";
import Drop from "./Drop";
import noimage from "/noimage.jpg"


function HorizentolCard({ data })
{
  console.log(data)
  
  return (
    <div className="w-full  p-5">
     
 
      {/* cards */}

      <div className="flex w-[100%] h-[40vh] overflow-x-scroll ">
        {data.map((d, i) => (
          <Link to={`/${d.media_type || title}/details/${d.id}`} key={i} className="min-w-[15%] m-2 bg-zinc-900 overflow-y-auto">
            <img
              className="w-full h-[55%] object-cover"
              src={d.backdrop_path || d.profile_path ? `https://image.tmdb.org/t/p/original/${
                d.backdrop_path || d.profile_path
              }`:{noimage} }alt="" 
            />

           <div className="p-2 ">
           <h1 className="text-white font-semibold text-lg">{d.title || d.original_name || d.original_title}</h1>
            <p className="text-white text-sm  mt-2">
        {d.overview && d.overview.slice(0,40)}...<Link className="text-zinc-500">more</Link>
      </p>
           </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HorizentolCard;
