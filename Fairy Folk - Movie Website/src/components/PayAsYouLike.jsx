import React, { useState } from "react";

export default function PayAsYouLike() {
  return (
    <div className="payasyoulike">
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
        3. Use it here for 48 hours.
      </p>
    </div>
  );
}
