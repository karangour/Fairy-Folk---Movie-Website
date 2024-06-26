import React, { useState } from "react";
import('./css/MenuElements.css')
import { Link, animateScroll as scroll } from "react-scroll";
import insta_logo from "./../assets/Instagram.png";
import facebook_logo from "./../assets/Facebook.png";
import letterboxd_logo from "./../assets/letterboxd.png";
import imdb_logo from "./../assets/imdb.png";
import gmail_logo from "./../assets/Gmail.png";
import mail_logo from "./../assets/Mail.png";
import copy_logo from "./../assets/Copy.png";
import green_copy_logo from "./../assets/GreenCopy.png";
import menu from "./../assets/Menu.png";
import share from "./../assets/Share.png";

export default function MenuElements(props) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState("");

  function toggleShare() {
    setIsShareOpen((currentState) => !currentState);
  }

  function toggleMenu() {
    setIsOpen((currentState) => !currentState);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleCopyLink() {
    const textToCopy = `🎥✨ PAY-AS-YOU-LIKE and experience the magic of "Fairy Folk" as Ritika (Rasika Dugal) and Mohit (Mukul Chadda) encounter a mysterious being that transforms their lives! Directed by Karan Gour, this critically acclaimed film masterfully blends fantasy and deep emotional storytelling. Don't miss this unique cinematic journey! 🌟🧚‍♀️\n\n#FairyFolkTheFilm #MustWatch #Magic #Fantasy #IndieFilm #Cinema\n\nCheck out the film here: https://www.fairyfolkthefilm.com`;

  navigator.clipboard
    .writeText(textToCopy)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 5000);
      })
      .catch((err) => {
        console.error("Error copying link: ", err);
        setCopySuccess(false);
      });
  }

  function handleShareMouseLeave() {
    setIsShareOpen((currentState) => !currentState);
  }

  function handleMouseOver(iconName) {
    console.log(iconName);
    return () => setHoveredIcon(iconName);
  }

  function handleMouseOut() {
    setHoveredIcon("");
  }

  console.log("Inside MenuElements tracking fullScreen:", props.fullScreen)

  return (
    <div className="menu-elements">
     
      <img
        src={share}
        className="share-button"
        alt="Share"
        onClick={toggleShare}
      />
      <div className="buttons-shading" />
      
      {/* {SHARE options} */}
      
      <div
        className={`${
          isShareOpen
            ? "share-options-menu share-options-visible"
            : "share-options-menu"
        }`}
        // onMouseLeave={handleShareMouseLeave}
      >
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=https://www.fairyfolkthefilm.com`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={facebook_logo}
            alt="Facebook Share"
            className={`insta-logo ${
              hoveredIcon === "facebook" ? "hovered" : ""
            }`}
            onMouseOver={handleMouseOver("facebook")}
            onMouseLeave={handleMouseOut}
          />
        </a>
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&su=Watch 'Fairy Folk' - the film!&body=${encodeURIComponent(
            `🎥✨ PAY-AS-YOU-LIKE and experience the magic of "Fairy Folk" as Ritika (Rasika Dugal) and Mohit (Mukul Chadda) encounter a mysterious being that transforms their lives! Directed by Karan Gour, this critically acclaimed film masterfully blends fantasy and deep emotional storytelling. Don't miss this unique cinematic journey! 🌟🧚‍♀️\n\n#FairyFolkTheFilm #MustWatch #Magic #Fantasy #IndieFilm #Cinema\n\nCheck out the film here: https://www.fairyfolkthefilm.com`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={gmail_logo}
            alt="Gmail Share"
            className={`insta-logo ${hoveredIcon === "gmail" ? "hovered" : ""}`}
            onMouseOver={handleMouseOver("gmail")}
            onMouseLeave={handleMouseOut}
          />
        </a>
        <a
          href={`mailto:?subject=Watch 'Fairy Folk' - the film!&body=${encodeURIComponent(
            `🎥✨ PAY-AS-YOU-LIKE and experience the magic of "Fairy Folk" as Ritika (Rasika Dugal) and Mohit (Mukul Chadda) encounter a mysterious being that transforms their lives! Directed by Karan Gour, this critically acclaimed film masterfully blends fantasy and deep emotional storytelling. Don't miss this unique cinematic journey! 🌟🧚‍♀️\n\n#FairyFolkTheFilm #MustWatch #Magic #Fantasy #IndieFilm #Cinema\n\nCheck out the film here: https://www.fairyfolkthefilm.com`
          )}`}
        >
          <img
            src={mail_logo}
            alt="Email Share"
            className={`insta-logo ${hoveredIcon === "mail" ? "hovered" : ""}`}
            onMouseOver={handleMouseOver("mail")}
            onMouseLeave={handleMouseOut}
          />
        </a>

        <img
          src={copySuccess ? green_copy_logo : copy_logo}
          alt="Copy Link"
          onClick={handleCopyLink}
          className={`insta-logo ${hoveredIcon === "copy" ? "hovered" : ""}`}
          onMouseOver={handleMouseOver("copy")}
          onMouseLeave={handleMouseOut}
        />
      </div>

      {/* {MENU options} */}
      
      <img
        src={menu}
        className="menu-button"
        alt="Menu"
        onClick={() => {
          toggleMenu();
          isShareOpen && toggleShare();
        }}
        style={{ display: props.fullScreen ? "none" : "block"}}
      />

      <div className={`menu ${isOpen ? "open" : ""}`}>
        <Link
          to="scroll-landing-home"
          spy={true}
          smooth={true}
          duration={1500}
          className={`menu-text ${hoveredIcon === "home" ? "highlight" : ""}`}
          onMouseOver={handleMouseOver("home")}
          onMouseOut={handleMouseOut}
          onClick={handleClose}
        >
          HOME
        </Link>
        <Link
          to="scroll-landing-payasyoulike"
          spy={true}
          smooth={true}
          duration={1500}
          className={`menu-text ${
            hoveredIcon === "payasyoulike" ? "highlight" : ""
          }`}
          onMouseOver={handleMouseOver("payasyoulike")}
          onMouseOut={handleMouseOut}
          onClick={handleClose}
        >
          PAY-AS-YOU-LIKE
        </Link>
        <Link
          to="scroll-landing-watchfilm"
          spy={true}
          smooth={true}
          duration={1500}
          className={`menu-text ${
            hoveredIcon === "watchfilm" ? "highlight" : ""
          }`}
          onMouseOver={handleMouseOver("watchfilm")}
          onMouseOut={handleMouseOut}
          onClick={handleClose}
        >
          WATCH THE FILM
        </Link>
        <Link
          to="scroll-landing-about"
          spy={true}
          smooth={true}
          duration={1500}
          className={`menu-text ${hoveredIcon === "about" ? "highlight" : ""}`}
          onMouseOver={handleMouseOver("about")}
          onMouseOut={handleMouseOut}
          onClick={handleClose}
        >
          ABOUT
        </Link>
        <Link
          to="scroll-landing-videos"
          spy={true}
          smooth={true}
          duration={1500}
          className={`menu-text ${hoveredIcon === "videos" ? "highlight" : ""}`}
          onMouseOver={handleMouseOver("videos")}
          onMouseOut={handleMouseOut}
          onClick={handleClose}
        >
          VIDEOS
        </Link>
        <Link
          to="scroll-landing-gallery"
          spy={true}
          smooth={true}
          duration={1500}
          className={`menu-text ${
            hoveredIcon === "gallery" ? "highlight" : ""
          }`}
          onMouseOver={handleMouseOver("gallery")}
          onMouseOut={handleMouseOut}
          onClick={handleClose}
        >
          GALLERY
        </Link>
        <Link
          to="scroll-landing-getintouch"
          spy={true}
          smooth={true}
          duration={1500}
          className={`menu-text ${
            hoveredIcon === "getintouch" ? "highlight" : ""
          }`}
          onMouseOver={handleMouseOver("getintouch")}
          onMouseOut={handleMouseOut}
          onClick={handleClose}
        >
          GET IN TOUCH
        </Link>
        <div>
          <a
            href="https://www.instagram.com/fairy_folk_thefilm/"
            className="insta-button"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
          >
            <img
              src={insta_logo}
              className={`insta-logo ${
                hoveredIcon === "insta" ? "hovered" : ""
              }`}
              onMouseOver={handleMouseOver("insta")}
              onMouseOut={handleMouseOut}
            />
          </a>
          &nbsp;
          <a
            href="https://letterboxd.com/film/fairy-folk/"
            className="letterboxd-button"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
          >
            <img
              src={letterboxd_logo}
              className={`insta-logo ${
                hoveredIcon === "letterboxd" ? "hovered" : ""
              }`}
              onMouseOver={handleMouseOver("letterboxd")}
              onMouseOut={handleMouseOut}
            />
          </a>
          &nbsp;
          <a
            href="https://www.imdb.com/title/tt20202992/"
            className="imdb-button"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
          >
            <img
              src={imdb_logo}
              className={`insta-logo ${
                hoveredIcon === "imdb" ? "hovered" : ""
              }`}
              onMouseOver={handleMouseOver("imdb")}
              onMouseOut={handleMouseOut}
            />
          </a>
        </div>
        </div>

      
    </div>
  );
}
