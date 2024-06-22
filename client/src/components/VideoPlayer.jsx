import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import videojs from "video.js";
import "videojs-youtube";
import "video.js/dist/video-js.css";
import "./css/Videos.css";
import "./css/MenuElements.css"

const VideoPlayerContainer = styled.div`
  position: relative;
  height: 650px;

  @media (max-width: 1620px) {
    height: 561px;
  }

  @media (max-width: 1220px) {
    height: 477px;
  }

  @media (max-width: 1025px) {
    height: 337px;
  }

  @media (max-width: 769px) {
    height: 252px;
  }

  @media (max-width: 481px) {
    height: 168px;
  }

  @media (max-width: 361px) {
    height: 157px;
  }
`;

const VideoElement = styled.video`
  width: 1158px;
  height: 650px;

  @media (max-width: 1620px) {
    width: 1000px;
    height: 561px;
  }

  @media (max-width: 1220px) {
    width: 850px;
    height: 477px;
  }

  @media (max-width: 1025px) {
    width: 600px;
    height: 337px;
  }

  @media (max-width: 769px) {
    width: 450px;
    height: 252px;
  }

  @media (max-width: 481px) {
    width: 300px;
    height: 168px;
  }

  @media (max-width: 361px) {
    width: 280px;
    height: 157px;
  }
`;

const getOverlayStyle = (width) => {
  if (width <= 361) {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      zIndex: 11,
      backgroundColor: "black",
      display: "none",
      height: "157px",
    };
  } else if (width <= 481) {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      zIndex: 11,
      backgroundColor: "black",
      display: "none",
      height: "168px",
    };
  } else if (width <= 769) {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      zIndex: 11,
      backgroundColor: "black",
      display: "none",
      height: "252px",
    };
  } else if (width <= 1025) {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      zIndex: 11,
      backgroundColor: "black",
      display: "none",
      height: "337px",
    };
  } else if (width <= 1220) {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      zIndex: 11,
      backgroundColor: "black",
      display: "none",
      height: "477px",
    };
  } else if (width <= 1620) {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      zIndex: 11,
      backgroundColor: "black",
      display: "none",
      height: "561px",
    };
  } else {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      zIndex: 11,
      backgroundColor: "black",
      display: "none",
      height: "650px",
    };
  }
};

const getControlBarHeight = (width) => {
  if (width <= 361) return "55px";
  if (width <= 481) return "55px";
  if (width <= 769) return "55px";
  if (width <= 1025) return "56px";
  if (width <= 1220) return "56px";
  if (width <= 1620) return "56px";
  return "56px";
};

export default function VideoPlayer(props) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const CONTROL_BAR_HEIGHT = getControlBarHeight(window.innerWidth);

  const [overlayStyle, setOverlayStyle] = useState({
    height: "100%",
    pointerEvents: "none", // Start with allowing interactions
    backgroundColor: "rgba(255, 165, 0, 0)", // Initially invisible
  });

  const initializePlayer = () => {
    console.log("Initializing video.js player");

    playerRef.current = videojs(videoRef.current, {
      ...props.options,
      poster: props.activeThumbnail,
    });

    // Bind event to adjust overlay once the video starts playing
    playerRef.current.on("play", () => {
      setOverlayStyle({
        height: `calc(100% - ${CONTROL_BAR_HEIGHT}px)`, // Adjust to not cover the control bar
        pointerEvents: "auto", // Block interactions
        backgroundColor: "rgba(255, 165, 0, 0)", // Make overlay visible
      });
      requestFullScreen(); // Request full screen when play is triggered
    });

    playerRef.current.on("ended", () => {
      resetPosterToThumbnail();
    });

    // Explicitly control autoplay on initialization based on `firstTime`
    manageAutoplay(props.firstTime ? false : true);
  };

  // Function to request full screen
  const requestFullScreen = () => {
    const videoElement = videoRef.current;
    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
    } else if (videoElement.mozRequestFullScreen) {
      videoElement.mozRequestFullScreen();
    } else if (videoElement.webkitRequestFullscreen) {
      videoElement.webkitRequestFullscreen();
    } else if (videoElement.msRequestFullscreen) {
      videoElement.msRequestFullscreen();
    }
  };

  const manageAutoplay = (autoplay) => {
    if (playerRef.current) {
      playerRef.current.autoplay(autoplay);
    }
  };

  const updatePlayerSource = () => {
    if (playerRef.current) {
      console.log("Updating video source");
      setVideoEnded(false);
      playerRef.current.src(props.options.sources);
      manageAutoplay(!props.firstTime); // Apply autoplay policy based on the state
    }
  };

  const disposePlayer = () => {
    if (playerRef.current) {
      console.log("Disposing video.js player");
      playerRef.current.dispose();
      playerRef.current = null;
    }
  };

  const resetPosterToThumbnail = () => {
    if (playerRef.current) {
      console.log("Resetting video poster to thumbnail");
      playerRef.current.poster(props.activeThumbnail);
      setVideoEnded(true);
    }
  };
  

  useEffect(() => {
    initializePlayer();

    return () => {
      disposePlayer();
    };
  }, []);

  useEffect(() => {
    updatePlayerSource();
  }, [props.options.sources]);

  // Effect to update poster
  useEffect(() => {
    if (playerRef.current) {
      console.log("Updating video poster to: " + props.activeThumbnail);
      playerRef.current.poster(props.activeThumbnail);
    }
  }, [props.activeThumbnail]);

  const width = window.innerWidth;
  const overlayStyles = getOverlayStyle(width);

  return (
    <div className="video-window-videos">
      <VideoPlayerContainer data-vjs-player>
        <div style={overlayStyles} />
        <VideoElement ref={videoRef} className="video-js" />
        <div
          style={{
            position: "absolute",
            top: "0",
            height: CONTROL_BAR_HEIGHT,
            width: "100%",
            backgroundColor: "black",
            opacity: "0",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "0",
            height: CONTROL_BAR_HEIGHT,
            width: "100%",
            right: "0",
            backgroundColor: "black",
            opacity: "0",
          }}
        />
      </VideoPlayerContainer>
    </div>
  );
}
