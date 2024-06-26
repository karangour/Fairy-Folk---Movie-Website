import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import right from "./../assets/RightArrow.png";
import left from "./../assets/LeftArrow.png";
import "./css/Gallery.css";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [imageTrack, setImageTrack] = useState(0);
  const [arrowShowing, setArrowShowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const backendUrl = "https://api.fairyfolkthefilm.com";

    fetch(`${backendUrl}/assets/gallery`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setImages(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   if (images.length > 0) {
  //     console.log(images[imageTrack].img);
  //   }
  // }, [images, imageTrack]);

  function handleArrowShowing() {
    return setArrowShowing((prevState) => !prevState);
  }

  function handleMouseOut() {
    return setArrowShowing(false);
  }

  function handleLeftArrow() {
    if (imageTrack != 0) {
      return setImageTrack((prev) => prev - 1);
    } else setImageTrack(images.length - 1);
  }

  function handleRightArrow() {
    if (imageTrack != images.length - 1) {
      return setImageTrack((prev) => prev + 1);
    } else return setImageTrack(0);
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => handleRightArrow(),
    onSwipedRight: () => handleLeftArrow(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="gallery">
      <div className="all-page-headings">
        <h1 className="heading-thin">GALLERY</h1>
        <hr className="underline-heading-gallery" />
      </div>
      <div
        className="gallery-window"
        onMouseOver={handleArrowShowing}
        onMouseOut={handleMouseOut}
        {...handlers}
      >
        <div className={`arrow-div ${arrowShowing ? "show-arrows" : ""}`}>
          <img
            src={left}
            className="arrow left-arrow"
            onClick={handleLeftArrow}
          />
          <img
            src={right}
            className="arrow right-arrow"
            onClick={handleRightArrow}
          />
        </div>
        {/* <p className="testing">{images[imageTrack].img}</p> */}
        {images.length > 0 && (
          <img
            src={images[imageTrack].img}
            alt={`Image ${imageTrack + 1}`}
            className="gallery-image"
          />
        )}
      </div>
    </div>
  );
}
