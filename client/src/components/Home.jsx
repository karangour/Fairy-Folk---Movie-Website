
import React, { useState, useEffect, useRef } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import "./css/Home.css";

export default function Home() {
//   // Testing
//   console.log('Inside Home.jsx and props.userInfo is:', props.userInfo)
//   const [form, setForm] = useState(props.userInfo);


//   useEffect(() => {
//     setForm(props.userInfo);
//     console.log('After setting form = props.userInfo:', props.userInfo);

//   }, [props.userInfo]);
  

// function sendMail() {

// console.log('Inside Home -> sendMail for form:', form)
//   fetch("http://localhost:4000/email", {
//     method: "POST",
//     body: JSON.stringify(form),
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data.message);
//     })
//     .catch((error) => console.log("Error:", error.message));
//   }
  
//   // Testing end
  
  
  return (
    <div className="home">

     
      <div>
        <h1 className="heading-thin">WATCH</h1>{" "}
        <h1 className="heading-thick film-text">&nbsp;FILM</h1>
        <hr className="underline-heading-home" />
      </div>
      <div className="home-buttons">
        <h3 className="need-text oswald">I NEED A PASSWORD</h3>
        <Link
          to="scroll-landing-payasyoulike" 
          spy={true}
          smooth={true}
          duration={1500}
          className="need-button button" 
        />
        <h3 className="have-text oswald">I HAVE A PASSWORD</h3>
        <Link
          type="button"
          className="have-button button"
          to="scroll-landing-watchfilm"
          spy={true}
          smooth={true}
          duration={1500}
        />
      </div>
    </div>
  );
}
