import React, { useState } from "react";

export default function VidThumbnail(props) {
  function handleOnClick() {
    const newIndex = props.id - 1;
    props.thisTitle(newIndex);
  }

  return (
    <div className="thumbnail-container" onClick={handleOnClick}>
      <h1 className="thumbnail-title">{props.title}</h1>
      <div className="title-bg" />
      <img src={props.thumbnail} className="thumbnail" />
    </div>
  );
}
