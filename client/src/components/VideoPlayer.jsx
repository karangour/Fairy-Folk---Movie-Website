import React, { useRef, useEffect, useState } from "react";
import videojs from "video.js";
import "videojs-youtube";
import "video.js/dist/video-js.css";

export default function VideoPlayer(props) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const CONTROL_BAR_HEIGHT = 30; // Set this to the height of your control bar

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
    });

    // Explicitly control autoplay on initialization based on `firstTime`
    manageAutoplay(props.firstTime ? false : true);
  };

  const manageAutoplay = (autoplay) => {
    if (playerRef.current) {
      playerRef.current.autoplay(autoplay);
    }
  };

  const updatePlayerSource = () => {
    if (playerRef.current) {
      console.log("Updating video source");
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

  return (
    <div className="video-window-videos">
      <div data-vjs-player style={{ position: "relative", height: "650px" }}>
        <video
          ref={videoRef}
          className="video-js"
          style={{
            width: "1158px",
            height: "650px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "0",
            height: "63px",
            width: "100%",
            backgroundColor: "black",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "0",
            height: "63px",
            width: "15%",
            right: "0",
            backgroundColor: "black",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            ...overlayStyle,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "24px",
            fontWeight: "bold",
            zIndex: 10,
          }}
        >
          {/* Display when interaction is blocked
          {overlayStyle.pointerEvents === "auto" && "Interaction Blocked"} */}
        </div>
      </div>
    </div>
  );
}

//just make the selected thumbnail orange
