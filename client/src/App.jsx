import { useState } from "react";
import "./App.css";
// Commented out unused imports
// import MenuElements from "./components/MenuElements";
// import Home from "./components/Home";
import Links from "./components/Links";
import poster from "./assets/FairyFolkWebsitePoster.jpg";
// import poster2 from "./assets/FairyFolkIntegratedPoster.jpg";

export default function App() {
  const [isFirstLoad] = useState(true);

  return (
    <div
      className={`everything ${isFirstLoad ? "fade-up-poster-elements" : ""}`}
      id="scroll-landing-home"
    >
      <div className="footers">
        {/* <div className="footer-width-control">
          <a
            className="privacy-policy"
            href="/privacy-policy.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            -PRIVACY POLICY-
          </a>
          <a
            className="privacy-policy"
            href="/cancellation-policy.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            -CANCELLATION POLICY-
          </a>
          <a
            className="terms-of-use"
            href="/terms-of-use.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            -TERMS OF USE-
          </a>
        </div> */}
      </div>
      <div className="poster-things">
        <img src={poster} className="poster" alt="Fairy Folk Poster" />
        {/* <img src={poster2} className="poster2" alt="Fairy Folk Poster 2" /> */}
        {/* <MenuElements /> */}
        {/* <Home /> */}
        <Links />
      </div>
    </div>
  );
}
