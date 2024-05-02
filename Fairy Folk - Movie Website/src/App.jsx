import React, { useState } from "react";
import "./App.css";
import MenuElements from "./components/MenuElements";
import Home from "./components/Home";
import poster from "./assets/FairyFolkWebsitePoster.png";
// import payAsYouLike from "./components/payAsYouLike";
// import watchFilm from "./components/watchFilm";
// import About from "./components/About";
// import Videos from "./components/Videos";
// import Gallery from "./components/Gallery";

export default function App() {
  return (
    <div className="everything">
      <div className="poster-things">
        <img src={poster} className="poster" alt="Fairy Folk Poster" />
        <MenuElements />
      </div>

      <div className="parent-container">
        <Home />
        {/* <payAsYouLike />
        <watchFilm />
        <About />
        <Videos />
        <Gallery /> */}
      </div>
    </div>
  );
}
