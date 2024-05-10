import React, { useState } from "react";
import { Link, animateScroll as scroll } from "react-scroll";

import menu from "./../assets/Menu.png";
import share from "./../assets/Share.png";

export default function MenuElements() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    return setIsOpen((currentState) => !currentState);
  }

  return (
    <div className="menu-elements">
      <img src={share} className="share-button" />

      <img
        src={menu}
        className="menu-button"
        alt="Menu"
        onClick={toggleMenu}
        style={{ cursor: "pointer" }}
      />

      {isOpen && (
        <div className="menu">
          <Link
            to="scroll-landing-home"
            spy={true}
            smooth={true}
            duration={1500}
            className="menu-text"
          >
            HOME
          </Link>
          <Link
            to="scroll-landing-payasyoulike"
            spy={true}
            smooth={true}
            duration={1500}
            className="menu-text"
          >
            PAY-AS-YOU-LIKE
          </Link>
        </div>
      )}
    </div>
  );
}
