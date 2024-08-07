import React, { useState, useEffect } from "react";
import cast from "./../assets/Cast.png";
import VideoPlayer from "./VideoPlayer";
import "./css/WatchFilm.css";

export default function WatchFilm() {
  // const [noYoutubeApp, setNoYouTubeApp] = useState(false);
  const [password, setPassword] = useState("");
  const [passValid, setPassValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorWindow, setShowErrorWindow] = useState(false);

  useEffect(() => {
    // Add viewport meta tag if it doesn't exist
    let viewportMetaTag = document.querySelector('meta[name="viewport"]');
    if (!viewportMetaTag) {
      viewportMetaTag = document.createElement("meta");
      viewportMetaTag.name = "viewport";
      viewportMetaTag.content = "width=device-width, initial-scale=1.0";
      document.head.appendChild(viewportMetaTag);
    }

    // Check for iPhone and set maximum-scale if true
    if (navigator.userAgent.indexOf("iPhone") > -1) {
      viewportMetaTag.setAttribute(
        "content",
        "width=device-width, initial-scale=1, maximum-scale=1"
      );
    }
  }, []);

  function handleCast() {
    const videoUrl = "https://www.youtube.com/watch?v=Sy49xsKotTg";
    const appScheme = `vnd.youtube://${videoUrl.split("watch?v=")[1]}`;

    const start = Date.now();
    const timeout = 2000;

    window.location = appScheme;
  }

  function playMovie() {}

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("inside handleSubmit");
    const data = {
      password,
      date: new Date().toISOString(),
    };

    // const data = { password }; //this creates an object called 'data' that holds a key called 'password' with what is stored in password as its value. Important for server things.

    fetch("https://api.fairyfolkthefilm.com/passwords/verify", {
      method: "POST", // Because we're handling sensitive passwords, POST is preferred over GET
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.message || "Unknown Error");
          });
        }
        return response.json();
      })
      .then((result) => {
        console.log(result.message);
        setPassValid(true);
        playMovie();
      })
      .catch((error) => {
        setErrorMessage(error.message);
        console.log("This is the error.message content:", error.message);
        setShowErrorWindow(true);
      });
  };

  function toggleNoYouTubeApp() {
    setNoYouTubeApp((prevState) => !prevState);
  }

  function toggleShowErrorWindow() {
    setShowErrorWindow((prevState) => !prevState);
    setPassword("");
  }

  const videoJsOptions = React.useMemo(
    () => ({
      techOrder: ["youtube"],
      autoplay: true,
      controls: true,
      sources: [
        {
          src: "https://www.youtube.com/watch?v=Sy49xsKotTg",
          type: "video/youtube",
        },
      ],
    }),
    []
  );


  return (
    <div className="fairyfolkthefilm">
      <div className="all-page-headings">
        <h1 className="heading-thin">WATCH THE </h1>{" "}
        <h1 className="heading-thick folk-text">FILM</h1>
        <hr className="underline-heading-fairyfolk" />
      </div>
      {/* <div
        className="no-app-notice"
        style={{ display: noYoutubeApp ? "flex" : "none" }}
      >
        <h1 onClick={toggleNoYouTubeApp}>Please install the YouTube app.</h1>
      </div> */}
      <div className={`casting ${passValid ? "casting-show" : ""}`}>
        <p
          className="cast-instruct"
          // style={{ filter: noYoutubeApp ? "blur(3px)" : "" }}
        >
          Click here - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- to
          watch the film on your TV screen. Once the YouTube app launches,
          you'll find the same icon on the top-right of the YouTube video -
          click it. If it doesn't work, ensure your phone and your TV have the
          YouTube app installed, and are on the same WiFi network.
        </p>
        <img
          src={cast}
          className={`cast-icon ${passValid && "cast-icon-active"}`}
          style={{
            // filter: noYoutubeApp ? "blur(3px)" : "",
            cursor: passValid ? "pointer" : "none",
          }}
          onClick={passValid ? handleCast : ""}
        />
      </div>
      {passValid && (
        <VideoPlayer
          options={videoJsOptions}
          // activeThumbnail={poster}
          firstTime={true}
        />
      )}
      <div
        className="video-window-fairyfolk"
        style={{ display: passValid ? "none" : "flex" }}
      >
        <div
          className="no-app-notice"
          style={{
            display: showErrorWindow ? "flex" : "none",
            marginTop: "15px",
          }}
          onClick={toggleShowErrorWindow}
        >
          <h1>{errorMessage}</h1>
        </div>
        <div
          className="enter-pass"
          style={{ filter: showErrorWindow ? "blur(3px)" : "" }}
        >
          ENTER PASSWORD
          <form onSubmit={handleSubmit} className="submit-button-div">
            <input
              type="password"
              className="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="pass-submit-button button" />
            <p className="pass-submit-text oswald">SUBMIT</p>
          </form>
        </div>
      </div>
    </div>
  );
}
