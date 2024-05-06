import React, { useState } from "react";

export default function VidThumbnail(props) {
  return (
    <div className="thumbnail-container">
      <img src={props.thumbnail}></img>
      <h1 className="thumbnail-title">{props.title}</h1>
    </div>
  );
}
