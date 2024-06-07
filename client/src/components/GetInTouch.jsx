import React, { useState } from "react";
import "./css/GetInTouch.css"

export default function GetInTouch() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const [messageExists, setMessageExists] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    fetch("http://localhost:4000/email", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        setSent(true);
        setTimeout(() => {
          setSent(false);
          setForm({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
          setMessageExists(false);
        }, 3000);
      })
      .catch((error) => console.log("Error:", error.message));
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    if (name === "message") {
      setMessageExists(value.trim().length > 0);
    }
  }

  return (
    <div className="getintouch">
      {/* <hr className="ruler" /> */}
      <div>
        <div id="scroll-landing-getintouch" />
        <h1 className="heading-thin">GET IN</h1>
        <h1 className="heading-thick">&nbsp;TOUCH</h1>
        <hr className="underline-heading-getintouch" />
      </div>
      <p className="getintouch-description oswald">
        Need support? Loved the film? Not so much? We'd love to know:
      </p>

      <form
        className="getintouch-form"
        onSubmit={(event) => messageExists && handleSubmit(event)}
      >
        <div
          className={`msg-sent-notice ${sent ? "msg-sent-notice-show" : ""}`}
        >
          <h1>Message sent!</h1>
        </div>
        <div
          className="message-box"
          style={{
            filter: sent ? "blur(3px)" : "",
            transition: "filter 1s ease",
          }}
        >
          <label className="standard-flex">
            <p className="label">Name</p>
            <input
              className="input-format"
              name="name"
              onChange={handleChange}
              value={form.name}
            />
          </label>
          <label className="standard-flex">
            <p className="label">Email</p>
            <input
              className="input-format"
              name="email"
              onChange={handleChange}
              value={form.email}
            />
          </label>
          <label className="standard-flex">
            <p className="label subject-getintouch">Subject</p>
            <input
              className="input-format"
              name="subject"
              onChange={handleChange}
              value={form.subject}
            />
          </label>
          <label className="message-body">
            <p
              className="label message-getintouch"
              style={{ display: messageExists ? "none" : "" }}
            >
              Message
            </p>
            <textarea
              className="message-input"
              name="message"
              onChange={handleChange}
              value={form.message}
            />
          </label>
        </div>
        <button
          type="submit"
          className={`getintouch-submit-button ${
            messageExists
              ? "getintouch-submit-button-show getintouch-submit-button-active"
              : ""
          }`}
          disabled={!messageExists}
          style={{
            filter: sent ? "blur(3px)" : "",
            transition: "filter 1s ease",
          }}
        >
          SEND
        </button>
      </form>
    </div>
  );
}
