import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../store/Actions/PeopleAction";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import LoadingSpinner from "./partial/Loader";
import HorizentolCard from "./partial/HorizentolCard";
import Drop from "./partial/Drop";

function PersonDetails() {
  document.title = "CineVerse | PersonDetails"

  const { pathname } = useLocation();
  console.log(pathname);
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.person);
  console.log(info);
  const { id } = useParams();
  const dispatch = useDispatch();

  const [category, setcategory] = useState("movie")
  
  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);
  return info ? (
    <div className="w-full h-full text-white px-32 p-5">
      <div className=" gap-10 h-[10vh] text-2xl pl-10 items-center text-white">
        <i
          onClick={() => navigate(-1)}
          class="ri-arrow-left-line hover:text-[#6556cd]"
        ></i>{" "}
      </div>

      <div className="flex gap-10">
        {/* poster and left details */}

      <div className="text-zinc-400">
        <img
          className=" h-[45vh] object-cover shadow-[8px_17px_28px_2px_rgba(0,0,0,0.5)]"
          src={`https://image.tmdb.org/t/p/original/${
            info.details.profile_path || info.details.backdrop_path
          }`}
          alt=""
        />

        <hr className="w-[25vh] mt-5" />
        <div className="text-2xl flex gap-3 mt-2">
          {info.externalid.instagram_id && (
            
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i class="ri-instagram-line "></i>
            </a>
          )}
          {info.externalid.wikidata_id && (
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i class="ri-global-line "></i>
            </a>
          )}
                    {info.externalid.facebook_id && (
            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i class="ri-facebook-line "></i>
            </a>
          )}
          {info.externalid.twitter_id && (
            <a
              target="_blank"
              href={`https://www.x.com/${info.externalid.twitter_id}`}
            >
              <i class="ri-twitter-x-line "></i>
            </a>
          )}
          {info.externalid.imdb_id && (
            <a 
              target="_blank"
              href={`https://www.imdb.com/name/${info.externalid.imdb_id}/`}
            >
              imdb
            </a>
          )}
        </div>
        <div className="mt-5 text-zinc-400">
          <h1 className="text-2xl font-semibold ">
              Personal Info
          </h1>
          <div className="mt-3 ">
            <h1 className="font-semibold text-lg">Known for</h1>
            <h1 className="text-zinc-200">{info.details.known_for_department}</h1>
          </div>
          <div className="mt-3 ">
            <h1 className="font-semibold text-lg">Gender</h1>
            <h1 className="text-zinc-200">{info.details.gender == 1 ? "Female" : "Male"}</h1>
          </div>
          <div className="mt-3 ">
            <h1 className="font-semibold text-lg">Date of Birth</h1>
            <h1 className="text-zinc-200">{info.details.birthday}</h1>
          </div>
          <div className="mt-3">
            <h1 className="font-semibold text-lg">Deathday</h1>
            <h1 className="text-zinc-200">{info.details.deathday ?  info.details.deathday : "Still Alive"}</h1>
          </div>
          <div className="mt-3">
            <h1 className="font-semibold text-lg">Birth place</h1>
            <h1 className="text-zinc-200">{info.details.place_of_birth}</h1>
          </div>

        </div>
      </div>
      
      {/* right details */}
      <div className="text-zinc-400 w-[80%]">
         <h1 className="text-4xl font-bold text-zinc-200">
          {info.details.name}
         </h1>
         <div className="mt-5">
          <h1 className="font-semibold text-xl text-zinc-300 ">Biography</h1>
          <h1 className="mt-2">{info.details.biography.slice(0,500)}...</h1>
         </div>
         <div className="mt-5">
          <h1 className="text-xl font-semibold text-zinc-300">Known For</h1>
          <HorizentolCard data={info.combineCredits.cast} />
         </div>

         <div className="flex justify-between mt-5 w-full">
            <h1 className="text-xl text-zinc-200 font-semibold">Acting</h1>
            <Drop 
              title={"Category"}
              option={["movie", "tv"]}
              func={(e) => setcategory(e.target.value)}
            />
         </div>
         <div className="h-[40vh] pl-5 overflow-y-auto border-2 border-zinc-700 mt-5">
             {info[category + 'Credits'].cast.map((c,i)=>(
              <li key={i} className="mt-3 hover:bg-zinc-900 hover:text-white duration-300 p-4">
                <Link to={`/${category}/details/${c.id
                }`}>
                   <span>{c.title || c.name || c.original_name || c.original_title}</span>
                   <span className="block ml-5">
                    {
                      c.character && `Character name: ${c.character}`
                    }
                   </span>
                
                </Link>

              </li>
             )) }
         </div>
      </div>
      </div>
    </div>
  ) : (
    <LoadingSpinner />
  );
}

export default PersonDetails;

{
  /* <a target="_blank" href={info.details.homepage}>
          <i classname="ri-external-link-line"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i classname="ri-global-line "></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          imdb
        </a> */
}
