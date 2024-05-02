import React, { useState } from "react";

import menu from "./../assets/Menu.png";
import share from "./../assets/Share.png";


export default function MenuElements() {
  return (
    <div className="menu-elements">
      <img src={share} className="share-button" />
      <img src={menu} className="menu-button" />
    </div>
  );
}
