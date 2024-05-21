



import React, { useState, useEffect } from "react";

export default function VidThumbnail(props) {
  const [selected, setSelected] = useState(null);

  function handleOnClick() {
    const newIndex = props.id - 1;
    props.thisTitle(newIndex);
  }

  return (
    <div
      className={`thumbnail-container ${
        selected === props.id ? "hovered" : ""
      }`}
      onMouseOver={() => setSelected(props.id)}
      onMouseOut={() => setSelected(null)}
      onClick={handleOnClick}
    >
      <h1 className="thumbnail-title">{props.title}</h1>
      <div className="title-bg" />
      <img src={props.thumbnail} className="thumbnail" />
    </div>
  );
}
