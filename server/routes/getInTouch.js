const express = require("express");
const router = express.Router();
require("dotenv").config();
const nodeMailer = require("nodemailer");

router.route("/").post((req, res) => {
  const form = req.body;

  console.log(form);

  const transporter = nodeMailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.USER,
    to: "karangour@gmail.com",
    subject: "GetInTouch from fairyfolkthefilm.com",
    html: `FROM: ${form.name}<br>EMAIL: ${form.email}<br>SUBJECT: ${form.subject}<br>MESSAGE: ${form.message}`
  };

  const sendMail = async (transporter, mailOptions) => {
    try {
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
