const express = require("express");
const router = express.Router();
require("dotenv").config();
const nodeMailer = require("nodemailer");

const crypto = require("crypto");

const { getPasswords, setPassword } = require("./passwords");

router.route("/create").post((req, res) => {
  

  const userInfo = req.body;
  let updatedUserInfo = {};
  const allInfo = getPasswords();
  let entryFound = false;

  function createPassword(user) {
    user.name = userInfo.name;
    user.password = crypto.randomBytes(7).toString("hex").slice(0, 7);
    user.date = userInfo.date;
    user.expired = false;
    user.amount = Number(userInfo.amount) + Number(user.amount);

    return user;
  }

  const newInfo = allInfo.map((current) => {
    if (current.email === userInfo.email) {
      current = createPassword(current);
      entryFound = true;
      updatedUserInfo = current;
      
    }
    return current;
  });

  if (entryFound) {
    setPassword(newInfo);
  } else {
    
    let newUser = createPassword(userInfo);
    newUser.id = allInfo.length + 1;
    allInfo.push(newUser);
    setPassword(allInfo);
    updatedUserInfo = newUser;
    console.log("New user created and added:", newUser);
  }

  
  res.json({ ...updatedUserInfo, message: "Password created." });
});

module.exports = router;
