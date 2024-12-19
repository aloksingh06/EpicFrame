import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../store/Actions/MovieAction";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "./partial/Loader";
import HorizentolCard from "./partial/HorizentolCard";

function MovieDetails() {
  document.title = "CineVerse | MovieDetails"

  const { pathname } = useLocation();
  
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.movie);
  


  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id]);
  return info ? (
    // navbar
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5),rgba(0,0,0,0.8)), Url(https://image.tmdb.org/t/p/original/${info.details.backdrop_path}`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen h-full text-zinc-100 px-20 overflow-y-hidden relative"
    >
      <div className="w-full flex gap-10 h-[10vh] text-2xl pl-10 items-center">
        <i
          onClick={() => navigate(-1)}
          class="ri-arrow-left-line hover:text-[#6556cd]"
        ></i>{" "}
        <a target="_blank" href={info.details.homepage}>
          <i class="ri-external-link-line"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i class="ri-global-line "></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          imdb
        </a>
      </div>
      {/*details*/}
      <div className="w-full px-20 mt-5">
        {/*poster image*/}

        <div className="flex ">
          <img
            className=" h-[55vh] object-cover shadow-[8px_17px_28px_2px_rgba(0,0,0,0.5)]"
            src={`https://image.tmdb.org/t/p/original/${
              info.details.poster_path || info.details.backdrop_path
            }`}
            alt=""
          />
          <div className="ml-10 ">
            <div>
              <h1 className="text-4xl font-semibold">
                {info.details.title ||
                  info.details.original_title ||
                  info.details.original_name}
                <small className="text-lg ml-2 text-zinc-300">
                  {info.details.release_date.split("-")[0]}
                </small>
              </h1>
            </div>

            {/* details*/}
            <div className="flex items-center gap-2 mt-3 mb-10">
              {info.details.vote_average && (
                <div className="text-zinc-900 bg-yellow-400 w-10 h-10 flex justify-center items-center rounded-full ">
                  {(info.details.vote_average * 10).toFixed()} <sup>%</sup>
                </div>
              )}
              <h1 className="w-[60px] text-2xl font-semibold leading-5">
                User Score
              </h1>
              <h1>{info.details.release_date}</h1>
              <h1>{info.details.genres.map((g) => g.name).join(",")}</h1>
            </div>
            <div className="w-[80%]">
              <h1 className="text-2xl italic font-semibold">
                {info.details.tagline}
              </h1>
              <h1 className="mt-5 mb-1 text-xl font-semibold">Overview</h1>
              <p className="mb-10">{info.details.overview}</p>
              {/* <h1>Movie translated</h1>
            <p className="text-sm">{info.translations.join(", ")}</p> */}
              <Link
                to={`${pathname}/trailer`}
                className="py-3 px-5 bg-[#6556cd] rounded-lg mt"
              >
                <i classname="ri-google-play-line mr-1"></i>
                Play Trailer
              </Link>
            </div>
          </div>
        </div>
        {/*plateforms*/}

        <div>
          {info.watchproviders && info.watchproviders.flatrate && (
            <div className="flex gap-3 mt-3">
                  <h1>Available on Platform</h1>
                  {info.watchproviders.flatrate.map((m,i)=>(
                    <div>
                    <img
                      title={m.provider_name}
                      className="w-[4vh] rounded-lg"
                      src={`https://image.tmdb.org/t/p/original/${m.logo_path}`}
                      alt=""
                    />
                  </div>
                  ))}
            </div>
          )}
            
          
            {info.watchproviders &&
              info.watchproviders.buy &&(
              <div className="flex gap-3 mt-3">
                <h1 className="mr-5">Available on Buy</h1>
               {info.watchproviders.buy.map((m, i) => (
                <div>
                  <img
                    title={m.provider_name}
                    className="w-[4vh] rounded-lg"
                    src={`https://image.tmdb.org/t/p/original/${m.logo_path}`}
                    alt=""
                  />
                </div>
              ))}

              </div>
              )
              }
          
            {info.watchproviders &&
              info.watchproviders.rent &&
              (
          <div className="flex gap-3 mt-3">
            <h1 className="mr-5">Available on Rent</h1>
              {info.watchproviders.rent.map((m, i) => (
                <div>
                  <img
                    title={m.provider_name}
                    className="w-[4vh] rounded-lg"
                    src={`https://image.tmdb.org/t/p/original/${m.logo_path}`}
                    alt=""
                  />
                </div>
              ))}
          </div>)}
        </div>

        {/*recommendations and similar stuff*/}

        <div className="mt-14 mb-5">
          <hr className="mb-5 bg-zinc-500 " />
          <h1 className="text-2xl font-semibold">
            Recommendations & Similar stuff
          </h1>
          <HorizentolCard
            data={info.recommendations ? info.recommendations : info.similar}
          />
        </div>
      </div>
      <Outlet />
    </div>
  ) : (
    <Loader />
  );
}

export default MovieDetails;
