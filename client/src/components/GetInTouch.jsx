import React, { useState, useEffect } from "react";

export default function GetInTouch() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  let sent = false;

  function handleSubmit(event) {
    event.preventDefault();

    fetch("http://localhost:4000/getintouch", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        sent = true;
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

      <div className="message-box">
        <form className="getintouch-form" onSubmit={handleSubmit}>
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
          <label className="standard-flex">
            <p className="label message-getintouch">Message</p>
            <textarea
              className="message-input"
              name="message"
              onChange={handleChange}
              value={form.message}
            />
          </label>
          <button type="submit" className="getintouch-submit">
            SEND
          </button>
        </form>
      </div>
    </div>
  );
}
