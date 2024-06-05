const express = require("express");
const router = express.Router();
require("dotenv").config();
const nodeMailer = require("nodemailer");

const crypto = require("crypto");

const { getPasswords, setPassword } = require("./passwords");

router.route("/create").post((req, res) => {
  console.log("1. Request received at /create with body:", req.body);

  const userInfo = req.body;
  const allInfo = getPasswords();
  let entryFound = false;

  function createPassword(user) {
    if (!user.name && userInfo.name) user.name = userInfo.name;
    user.password = crypto.randomBytes(7).toString("hex").slice(0, 7);
    user.date = new Date();
    user.expired = false;
    user.amount = Number(userInfo.amount) + Number(user.amount);
    console.log("4. Creating password info..");
    return user;
  }

  const newInfo = allInfo.map((current) => {
    if (current.email === userInfo.email) {
      current = createPassword(current);
      entryFound = true;
      console.log("2. Entry was found and updated:", current);
    }
    return current;
  });

  if (entryFound) {
    setPassword(newInfo);
  } else {
    console.log("3. Entry was not found.");
    let newUser = createPassword(userInfo);
    newUser.id = allInfo.length + 1;
    allInfo.push(newUser);
    setPassword(allInfo);
    console.log("New user created and added:", newUser);
  }

  console.log("5. Updated passwords data:", allInfo);

  //Send the email
  const passwordDate = new Date();
  const passwordValidity = new Date(passwordDate.getTime() + 172800000);

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

  console.log("6. After transporter declaration.");

  const mailOptions = {
    from: process.env.USER,
    to: userInfo.email,
    subject: "Your Fairy Folk PASSWORD is here!",
    html: `Dear ${
      userInfo.name || userInfo.email
    }, <br> Thanks again for making the time to watch our film. <br> Here is your PASSWORD: ${
      userInfo.password
    }. It is valid till ${passwordValidity.toLocaleString()}.<br> We hope you enjoy watching the film as much as we enjoyed making it! <br> P.S. It helps a film like ours a great deal if you could share it, review it, shout about it from your balcony..anything to get the word out. We're counting on you! `,
  };

  console.log("7. After mailOptions declaration");

  const sendMail = async (transporter, mailOptions) => {
    console.log("8. I am inside sendMail");
    try {
      await transporter.sendMail(mailOptions);
      console.log("9. Email has been sent successfully!!");
      res.json({
        status: "Success",
        message: "Email sent successfully",
      });
    } catch (error) {
      console.log("Error while sending email:", error);
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

// const express = require("express");
// const router = express.Router();
// require("dotenv").config();
// const nodeMailer = require("nodemailer");

// const crypto = require("crypto");

// const { getPasswords, setPassword } = require("./passwords");

// router.route("/create").post((req, res) => {
//     console.log("Request received at /create with body:", req.body);
//   const userInfo = req.body;
//   const allInfo = getPasswords();
//   let entryFound = false;

//   function createPassword(user) {
//       if ((user.name === '') && (userInfo.name != '')) user.name = userInfo.name;
//       user.password = crypto.randomBytes(7).toString("hex").slice(0, 7);
//     user.date = new Date();
//     user.expired = false;

//     user.amount = Number(userInfo.amount) + Number(user.amount);

//     return user;
//   }

//     const newInfo = allInfo.map((current) => {
//       if (current.email === userInfo.email) {
//         current = createPassword(current);
//           entryFound = true;
//           console.log('Entry was found!')
//       }
//       return current;
//     });

//   if (entryFound) {
//     setPassword(newInfo);
//   } else {
//     let newUser = userInfo;
//     newUser = createPassword(newUser);
//     newUser.id = allInfo.length + 1;
//     allInfo.push(newUser);
//     setPassword(allInfo);
//   }
//     console.log('newInfo since karangour@gmail.com exists', newInfo)

//   //Send the email
//   const passwordDate = new Date(userInfo.date);
//     const passwordValidity = new Date(passwordDate.getTime() + 172800000);

//     const transporter = nodeMailer.createTransport({
//         service: "gmail",
//         host: "smtp.gmail.com",
//         port: 587,
//         secure: false,
//         auth: {
//           user: process.env.USER,
//           pass: process.env.APP_PASSWORD,
//         },
//       });

//   const mailOptions = {
//     from: process.env.USER,
//     to: userInfo.email,
//     subject: "Your Fairy Folk PASSWORD is here!",
//     html: `Dear ${
//       userInfo.name || userInfo.email
//     }, <br> Thanks again for making the time to watch our film. <br> Here is your PASSWORD: ${
//       userInfo.password
//     }. It is valid till ${passwordValidity.toLocaleString()}.<br> We hope you enjoy watching the film as much as we enjoyed making it! <br> P.S. It helps a film like ours a great deal if you could share it, review it, shout about it from your balcony..anything to get the word out. We're counting on you! `,
//   };

//     const sendMail = async (transporter, mailOptions) => {
//       console.log('I am inside sendMail')
//     try {
//       await transporter.sendMail(mailOptions);
//       console.log("Email has been sent successfully!!");
//       res.json({
//         status: "Success",
//         message: "You'll find your password in your email.",
//       });
//     } catch (error) {
//       console.log(error);
//       res.json({
//         status: "Error",
//         message: "Failed to send email",
//         error: error.message,
//       });
//     }
//   };

//   sendMail(transporter, mailOptions);

// });

// module.exports = router;
