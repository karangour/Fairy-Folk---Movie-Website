import React, { useState } from "react";
import cast from "./../assets/Cast.png";
import VideoPlayer from "./VideoPlayer";

export default function WatchFilm() {
  const [noYoutubeApp, setNoyoutubeApp] = useState(false);
  const [password, setPassword] = useState("");
  const [passValid, setPassValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorWindow, setShowErrorWindow] = useState(false);

  function handleCast() {
    const videoUrl = "https://www.youtube.com/watch?v=lfOxA7NPJDg";
    const appScheme = `vnd.youtube://${videoUrl.split("watch?v=")[1]}`;

    let iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = appScheme;
    document.body.appendChild(iframe);

    setTimeout(() => {
      document.body.removeChild(iframe);
      // Check if the page is still visible after the attempt
      if (document.visibilityState === "visible") {
        setNoyoutubeApp(true);
        setTimeout(() => setNoyoutubeApp(false), 3000);
      }
    }, 1000); // Timeout can be adjusted based on expected behavior
  }

  function playMovie() {}

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("inside handleSubmit");
    const data = { password }; //this creates a key called 'password' with what is stored in password as its value. Important for server things.

    fetch("http://localhost:4000/passwords/verify", {
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
        setTimeout(() => setShowErrorWindow(false), 5000);
      });
  };

  return (
    <div className="fairyfolkthefilm">
      <div id="scroll-landing-watchfilm" />
      <div>
        <h1 className="heading-thin">FAIRY</h1>{" "}
        <h1 className="heading-thick folk-text">FOLK</h1>
        <hr className="underline-heading-fairyfolk" />
      </div>
      <h1
        className="no-app-notice"
        style={{ display: noYoutubeApp ? "flex" : "none" }}
      >
        Please install the YouTube app.
      </h1>
      <p
        className="cast-instruct"
        style={{ filter: noYoutubeApp ? "blur(3px)" : "" }}
      >
        Click this 'CAST' icon -
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- to watch the film on
        your TV screen. Once the YouTube app launches automatically on your
        phone, click the CAST icon found on the top-right of the YouTube video.
        Ensure your phone and your TV have the YouTube app installed, and are on
        the same WiFi network.
      </p>
      <img
        src={cast}
        className="cast-icon"
        style={{ filter: noYoutubeApp ? "blur(3px)" : "" }}
        onClick={handleCast}
      />
      {/* <VideoPlayer options={videoJsOptions} activeThumbnail={activeThumbnail} firstTime={firstTime} /> */}
      <div
        className="video-window-fairyfolk"
        style={{ display: passValid ? "none" : "flex" }}
      >
        <h1
          className="no-app-notice"
          style={{
            display: showErrorWindow ? "flex" : "none",
            marginTop: "15px",
          }}
        >
          {errorMessage}
        </h1>
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

// make VideoPlayer work for this module with the film running
// test 5.1/stereo of youtube
