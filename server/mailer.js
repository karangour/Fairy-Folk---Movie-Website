require("dotenv").config();
const nodeMailer = require("nodemailer");

function mailer(emailContent) {
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
    subject: "testing!!",
    text: emailContent,
  };

  const sendMail = async (transporter, mailOptions) => {
    try {
      await transporter.sendMail(mailOptions);
      console.log("Email has been sent successfully!!");
    } catch (error) {
      console.log(error);
    }
  };

  sendMail(transporter, mailOptions);
}

module.exports = mailer;
