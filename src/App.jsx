import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Trending from "./Components/Trending";
import Popular from "./Components/Popural";
import Movies from "./Components/Movies"; // Movies page, e.g., list of movies
import Tv from "./Components/Tv";
import People from "./Components/People";
import MovieDetails from "./Components/MovieDetails"; // Specific movie details
import TvDetails from "./Components/TvDetails";
import PersonDetails from "./Components/PersonDetails";
import Trailer from "./Components/partial/Trailer";
import NotFound from "./Components/partial/Notfound";
import About from "./Components/About";

function App() {
  return (
    <div className="bg-[#1f1E24] w-full h-full flex">
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movies" element={<Movies />} /> {/* Movies List */}
        <Route path="/about" element={<About />} />

        {/* Movies (specific movie) Details with Nested Trailer */}
        <Route path="/movie/details/:id" element={<MovieDetails />}>
          <Route path="trailer" element={<Trailer />} />
        </Route>
        <Route path="/movies/details/:id" element={<MovieDetails />}>
          <Route path="trailer" element={<Trailer />} />
        </Route>
        {/* TV Routes with Nested Trailer */}
        <Route path="/tv" element={<Tv />} />
        <Route path="/tv/details/:id" element={<TvDetails />}>
          <Route path="trailer" element={<Trailer />} />
        </Route>

        {/* People Routes */}
        <Route path="/people" element={<People />} />
        <Route path="/people/details/:id" element={<PersonDetails />} />

        {/* Catch-All Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
