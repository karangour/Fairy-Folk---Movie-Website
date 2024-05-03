import React, { useState } from "react";
import "./App.css";
import MenuElements from "./components/MenuElements";
import Home from "./components/Home";
import poster from "./assets/FairyFolkWebsitePoster.png";
import PayAsYouLike from "./components/PayAsYouLike";
// import WatchFilm from "./components/WatchFilm";
// import About from "./components/About";
// import Videos from "./components/Videos";
// import Gallery from "./components/Gallery";

export default function App() {
  return (
    <div className="everything">
      <p className="rights-notice">
          © 2024 EMPATHEIA FILMS ALL RIGHTS RESERVED
        </p>
      <div className="poster-things">
        <img src={poster} className="poster" alt="Fairy Folk Poster" />
        <MenuElements />
       <Home /> 
      </div>

      <div className="parent-container">
        <PayAsYouLike />
        {/* <WatchFilm />
        <About />
        <Videos />
        <Gallery /> */}
      </div>
    </div>
  );
}
