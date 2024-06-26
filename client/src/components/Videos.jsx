import React, { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import VidThumbnail from "./VidThumbnail";
import "./css/Videos.css";

export default function Videos() {
  const [videoFiles, setVideoFiles] = useState([]);
  const [activeTitle, setActiveTitle] = useState("");
  const [activeSrc, setActiveSrc] = useState(
    "https://www.youtube.com/watch?v=lfOxA7NPJDg"
  );
  const [activeThumbnail, setActiveThumbnail] = useState(""); // Add state for active thumbnail
  const [firstTime, setFirstTime] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendUrl = "https://api.fairyfolkthefilm.com";

  useEffect(() => {
    fetch(`${backendUrl}/assets/vid_thumbnails`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setVideoFiles(data);
        setActiveSrc(data[0].location);
        setActiveThumbnail(data[0].thumbnail); // Set the thumbnail of the first video as active thumbnail
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching thumbnails:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const videoJsOptions = React.useMemo(
    () => ({
      techOrder: ["youtube"],
      autoplay: false,
      controls: true,
      sources: [
        {
          src: activeSrc,
          type: "video/youtube",
        },
      ],
    }),
    [activeSrc]
  );

  function mainVideoTitle(index) {
    if (videoFiles.length > 0 && videoFiles[index]) {
      setActiveTitle(videoFiles[index].title);
      setActiveSrc(videoFiles[index].location);
      setActiveThumbnail(videoFiles[index].thumbnail); // Set the active thumbnail
      setFirstTime(false);
    }
  }

  const videoThumbnails = videoFiles.map((video, idx) => {
    return (
      <VidThumbnail
        key={video.id}
        {...video}
        thisTitle={() => mainVideoTitle(idx)}
      />
    );
  });

  const scrollThumbnails = (direction) => {
    const container = document.querySelector(".video-thumbnails");
    const scrollAmount = 250; // Adjust this value as needed
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="videos">
      <div className="all-page-headings">
        <h1 className="heading-thin">VIDEOS</h1>
        <hr className="underline-heading-videos" />
      </div>
      <h1 className="title-main-video">
        {videoFiles.length > 0
          ? firstTime
            ? videoFiles[0].title
            : activeTitle
          : "Loading videos..."}
      </h1>
      <VideoPlayer options={videoJsOptions} firstTime={firstTime} />
      <div className="arrows-container">
        <div
          className="scroll-arrow left-arrow"
          onClick={() => scrollThumbnails("left")}
        >
          &lt;
        </div>
        <div
          className="scroll-arrow right-arrow"
          onClick={() => scrollThumbnails("right")}
        >
          &gt;
        </div>
      </div>
      <div className="video-thumbnails">{videoThumbnails}</div>
    </div>
  );
}
