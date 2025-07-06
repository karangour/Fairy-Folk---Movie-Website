// Links component
import { useState } from 'react';
import '../App.css';
import './Links.css';
// Commented out as review section is not currently in use
// import letterboxd_logo from "./../assets/letterboxd.png";
// import imdb_logo from "./../assets/imdb.png";
import prime_video_logo from "./../assets/Prime Video.png";

export default function Links() {
  const [clickedLink, setClickedLink] = useState(null);
  
  // Handle link click to reset styles after a delay
  const handleLinkClick = (index, url) => {
    setClickedLink(index);
    
    // Open the link in a new tab
    window.open(url, '_blank', 'noopener,noreferrer');
    
    // Reset the clicked state after 1 second
    setTimeout(() => {
      setClickedLink(null);
    }, 1000);
    
    // Prevent default behavior
    return false;
  };
  // Amazon Prime Video links for different regions
  const regionLinks = [
    {
      name: "India",
      url: "https://www.primevideo.com/detail/0IL1OBICSFX4CKJI8AHEJCZHLC/ref=atv_dl_rdr?tag=justinqxg9-21"
    },
    {
      name: "US",
      url: "https://www.amazon.com/gp/video/detail/amzn1.dv.gti.b21ac26e-464b-4c27-90f3-501531c53c70?tag=justusqxg9-20&token=ADE07EB7B9E7DB86DEEEF0D5D4FC5F0B5FB44D3F"
    },
    {
      name: "Australia",
      url: "https://www.primevideo.com/detail?camp=1789&gti=amzn1.dv.gti.b21ac26e-464b-4c27-90f3-501531c53c70&linkCode=xm2&tag=justau2tuk-22"
    },
    {
      name: "UK",
      url: "https://www.amazon.co.uk/gp/video/detail/0PP790B3I2KC8MQ00J9G3SRBSG/ref=atv_dl_rdr"
    }
  ];

  // Review platform links - currently not in use
  // const reviewLinks = [
  //   { 
  //     title: "Letterboxd", 
  //     url: "https://letterboxd.com/film/fairy-folk/",
  //     logo: letterboxd_logo
  //   },
  //   { 
  //     title: "IMDb", 
  //     url: "https://www.imdb.com/title/tt10333426/",
  //     logo: imdb_logo
  //   }
  // ];

  return (
    <div className="links-container">
      <div className="links-section">
        <div className="watch-section">
          <div className="watch-container">
            <div className="prime-video-container">
              <img src={prime_video_logo} alt="Amazon Prime Video" className="prime-video-logo" />
              <div className="region-links">
                {regionLinks.map((link, index) => (
                  <a 
                    key={index} 
                    href={link.url} 
                    className={`region-link ${clickedLink === index ? 'clicked' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(index, link.url);
                    }}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="review-section">
        <div className="review-links">
          {reviewLinks.map((link, index) => (
            <a 
              key={index}
              href={link.url}
              className="review-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={link.logo} alt={link.title} className="review-logo" />
            </a>
          ))}
        </div>
      </div> */}
    </div>
  );
}