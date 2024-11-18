import React from "react";
import Sidebar from "./partial/Sidebar";

function About() {
  return (
    <div className="w-full h-full text-zinc-300 flex">
      <Sidebar />

      <div className="w-[80%] border-2 m-10 border-[#6556cd] ">
        <div className="flex items-center flex-col mt-10">
          <h1 className="text-4xl font-bold">About</h1>

          <h1 className=" text-3xl font-semibold text-[#6556cd]">CINE VERSE</h1>
        </div>
        <div className="px-10 p-10 text-center text-lg ">
          <h1 className="p-5 ">
            Welcome to CineVerse your ultimate destination for
            everything movies and TV! <br /> Whether you're a casual viewer, a
            binge-watcher, or a dedicated cinephile, we provide you with
            up-to-date information and insights on all your favorite films and
            series. <br /> Dive into detailed synopses, cast lists, release dates,
            trailers, reviews, and much more. Our mission is to make it easy for
            you to explore, discover, and keep up with the entertainment world. <br /> 
            At CineVerse, we believe that every story is worth
            discovering. We’re here to enhance your viewing experience by
            delivering accurate, engaging content about both the latest releases
            and timeless classics. Our team is passionate about film and TV, and
            we’re dedicated to keeping you informed, inspired, and entertained. <br /> <br />
            <span className="font-semibold">Thank you for joining us on this journey through the cinematic
            universe. Let’s get watching!</span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default About;
