import React, { useState } from "react";
import "./App.css";
import MenuElements from "./components/MenuElements";
import Home from "./components/Home";
import poster from "./assets/FairyFolkWebsitePoster.jpg";
import poster2 from "./assets/FairyFolkIntegratedPoster.jpg"
import PayAsYouLike from "./components/PayAsYouLike";
import WatchFilm from "./components/WatchFilm";
import About from "./components/About";
import Videos from "./components/Videos";
import Gallery from "./components/Gallery";
import GetInTouch from "./components/GetInTouch";

export default function App() {

  return (
    <div className="everything" id="scroll-landing-home">
      <div className="footers">
        <div className="footer-width-control">
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
        </div>
      </div>
      <div className="poster-things">
        <img src={poster} className="poster" alt="Fairy Folk Poster" />
        <img src={poster2} className="poster2" alt="Fairy Folk Poster 2" />
        <MenuElements />
        <Home/>
      </div>

      <div className="parent-container">
      <div id="scroll-landing-payasyoulike" />
        <PayAsYouLike />
        <div id="scroll-landing-watchfilm" />
        <WatchFilm  />
        <div id="scroll-landing-about" />
        <About />
        <div id="scroll-landing-videos" />
        <Videos />
        <div id="scroll-landing-gallery" />
        <Gallery />
        <div id="scroll-landing-getintouch" />
        <GetInTouch />
        <div className="placeholder" />
      </div>
    </div>
  );
}
