const express = require("express");
const router = express.Router();
require("dotenv").config();
const nodeMailer = require("nodemailer");

router.route("/").post((req, res) => {
  const myEmail = "empatheiafilms@gmail.com";
  const form = req.body;
  let mailOptions = {};

  console.log(form);

  const transporter = nodeMailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: myEmail,
      pass: process.env.APP_PASSWORD,
    },
  });

  if ("password" in form) {
    const passwordDate = new Date(form.date);
    const passwordValidity = new Date(passwordDate.getTime() + 172800000);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };

    mailOptions = {
      from: `"Empatheia Films" <${myEmail}>`,
      to: form.email,
      subject: "Your Fairy Folk PASSWORD is here!",
      html: `Dear ${
        form.name || form.email
      }, <br><br>Your PASSWORD: <h3 style="display:inline;">${
        form.password
      }</h3><br><i>Expiry:</i> <h4 style="display:inline;">${passwordValidity.toLocaleString(
        "en-US",
        options
      )} (GMT)</h4><br><br> Thanks again for making the time for our film. We hope you enjoy watching it as much as we enjoyed making it! <br> It would mean a lot if you could share the film, leave a review on <a href="https://www.imdb.com/title/tt20202992/" target="_blank">IMDb</a> or <a href="https://letterboxd.com/film/fairy-folk/" target="_blank">Letterboxd</a>, and/or contribute if you haven't already. If you've already contributed (and are feeling extra generous), you could contribute again for a friend and gift them a password. We're counting on you!</b> `,
    };
  } else {
    mailOptions = {
      from: `"Empatheia Films" <${myEmail}>`,
      to: "karangour@gmail.com",
      subject: "GetInTouch from fairyfolkthefilm.com",
      html: `FROM: ${form.name}<br>EMAIL: ${form.email}<br>SUBJECT: ${form.subject}<br>MESSAGE: ${form.message}`,
    };
  }
  console.log("Mail options prepared:", mailOptions);

  const sendMail = async (transporter, mailOptions) => {
    try {
      console.log("Inside sendMail, but before transporter.sendMail call!");
      console.log(`Password is ${process.env.APP_PASSWORD}`);
      await transporter.sendMail(mailOptions);
      console.log("Email has been sent successfully!!");
      res.json({
        status: "Success",
        message: "Email sent successfully",
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "Error",
        message: "Failed to send email",
        error: error.message,
      });
    }
  };

  sendMail(transporter, mailOptions);
});

module.exports = router;
