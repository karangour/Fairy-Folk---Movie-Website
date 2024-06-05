import React, { useState } from "react";
import "./App.css";
import MenuElements from "./components/MenuElements";
import Home from "./components/Home";
import poster from "./assets/FairyFolkWebsitePoster.png";
import PayAsYouLike from "./components/PayAsYouLike";
import WatchFilm from "./components/WatchFilm";
import About from "./components/About";
import Videos from "./components/Videos";
import Gallery from "./components/Gallery";
import GetInTouch from "./components/GetInTouch";

export default function App() {
  return (
    <div className="everything" id="scroll-landing-home">
      <a
        className="privacy-policy"
        href="/privacy-policy.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        -PRIVACY POLICY-
      </a>

      <p className="rights-notice">
        © 2024 EMPATHEIA FILMS ALL RIGHTS RESERVED
      </p>
      <a
        className="terms-of-use"
        href="/terms-of-use.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        -TERMS OF USE-
      </a>
      <div className="poster-things">
        <img src={poster} className="poster" alt="Fairy Folk Poster" />
        <MenuElements />
        <Home />
      </div>

      <div className="parent-container">
        <PayAsYouLike />
        <WatchFilm />
        <About />
        <Videos />
        <Gallery />
        <GetInTouch />
        <div className="placeholder" />
      </div>
    </div>
  );
}
