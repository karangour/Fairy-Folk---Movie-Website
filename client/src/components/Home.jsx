import React, { useState, useEffect, useRef } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import "./css/Home.css";

export default function Home() {
  return (
    <div className="home">
      <div className="watchfilm-title">
        <h1 className="heading-thin-home">WATCH</h1>{" "}
        <h1 className="heading-thick-home film-text">&nbsp;FILM</h1>
        <hr className="underline-heading-home" />
      </div>
      <div className="home-buttons">
        <h3 className="need-text">I NEED A PASSWORD</h3>
        <Link
          to="scroll-landing-payasyoulike"
          spy={true}
          smooth={true}
          duration={1500}
          className="need-button button"
        />
        <h3 className="have-text">I HAVE A PASSWORD</h3>
        <Link
          type="button"
          className="have-button button"
          to="scroll-landing-watchfilm"
          spy={true}
          smooth={true}
          duration={1500}
        />
      </div>
    </div>
  );
}
