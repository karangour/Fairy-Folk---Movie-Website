import React, { useState } from "react";

export default function PayAsYouLike() {
  return (
    <div className="payasyoulike">
      <div id="scroll-landing-payasyoulike" />
      <div>
        <h1 className="heading-thin">PAY-AS-</h1>{" "}
        <h1 className="heading-thick you-like-text">YOU-LIKE</h1>
        <hr className="underline-heading-payasyoulike" />
      </div>

      <p className="main-text">
        As fun as our film 'Fairy Folk' was to make, the challenges we faced as
        a truly independent production ranged from testing to downright
        crippling. But we somehow made it through, only to confront the beast of
        all beasts - distribution. While we managed a limited theatrical release
        in March 2024, the film unfortunately had to be pulled from cinemas just
        as word of mouth was gaining momentum. Additionally (and more
        importantly), as of 2024, digital platforms aren’t considering
        independent films like ours any more. It’s not just tough getting their
        attention; it's impossible. So, here we are - on our own little website,
        distributing our film at any price YOU feel is right. 
      </p>
      <p className="thanks">
        Thank you for considering supporting our little film; it means the world
        to us!
      </p>
      <hr className="division-description" />

      <p className="password-instructions instruction-box">
        1. Fill in the details below. <br />
        2. Receive a PASSWORD in your email. <br />
        3. Copy and use it here for 48 hours.
      </p>

      <div className="user-details">
        <div className="name-email-amount">
          <p className="name-text">Name </p>
          <p className="optional-text">(optional)</p>
          <p className="email-text"> Email </p>
          <p className="amount-text">Amount </p>
        </div>
        <div className="inputs">
          <input type="text" name="name" className="input-name input-format" />
          <input
            type="email"
            name="email"
            className="input-email input-format"
          />
          <input
            type="number"
            name="amount"
            className="input-amount input-format"
          />
          <p className="contribution-zero">
            (you can enter '0' if you don't feel like contributing at this
            stage)
          </p>
        </div>
        <select className="currency-selector" name="Currencies">
          <option value="INR">INR</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="JPY">JPY</option>
          <option value="GBP">GBP</option>
          <option value="AUD">AUD</option>
          <option value="CAD">CAD</option>
          <option value="CHF">CHF</option>
          <option value="CNH">CNH</option>
          <option value="HKD">HKD</option>
          <option value="NZD">NZD</option>
        </select>
      </div>
      <div className="payasyoulike-button">
        <h3 className="get-password-text oswald">GET PASSWORD</h3>
        <button className="get-password-button" />
      </div>
      <div className="contribution-section">
        <div className="budget-box">
          <p className="budget-text">budget: </p>
          <p className="budget-num">₹2,00,00,000 / $200,000</p>
        </div>
        <div className="contribution-chart">
          <div className="contribution-fill"></div>
          <hr className="budget-marker" />
          <div className="tube-curve-top" />
          <div className="tube-curve-bottom" />
          <div className="contri-cyl" />
        </div>
        <div className="contri-box">
          <p className="contri-text">contribution: </p>
          <p className="contri-num">₹2,50,000 / $25,000</p>
        </div>
      </div>
    </div>
  );
}
