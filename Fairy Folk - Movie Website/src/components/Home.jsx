import React, { useState } from "react";

export default function Home() {
  return (
    <div className="home">
      <div>
        <h1 className="heading-thin">WATCH</h1>{" "}
        <h1 className="heading-thick film-text">FILM</h1>
        <hr className="underline-heading-home" />
      </div>
      <div className="home-buttons">
        <h3 className="need-text oswald">I NEED A PASSWORD</h3>
        <button type='button' className="need-button button" />
        <h3 className="have-text oswald">I HAVE A PASSWORD</h3>
        <button type='button' className="have-button button" />
      </div>
    </div>
  );
}
