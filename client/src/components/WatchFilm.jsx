import React, { useState } from "react";
import cast from "./../assets/Cast.png";

export default function WatchFilm() {
  return (
    <div className="fairyfolkthefilm">
      <div id="scroll-landing-watchfilm" />
      <div>
        <h1 className="heading-thin">FAIRY</h1>{" "}
        <h1 className="heading-thick folk-text">FOLK</h1>
        <hr className="underline-heading-fairyfolk" />
      </div>
      <p className="cast-instruct">
        You can press the &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; icon
        to watch the film on your TV screen. Just make sure your TV and your
        phone/iPad/laptop are connected to the same WiFi network.
      </p>
      <img src={cast} className="cast-icon" />
      <div className="video-window-fairyfolk"></div>
      <div className="enter-pass">
        ENTER PASSWORD
        <div className="submit-button-div">
          <input type="password" className="password" />
          <button type="submit" className="pass-submit-button button" />
          <p className="pass-submit-text oswald">SUBMIT</p>
        </div>
      </div>
    </div>
  );
}
