const express = require("express");
const router = express.Router();
const { getPasswords, setPassword } = require("./passwords");

router.route("/verify").post((req, res) => {
  console.log(req.body);
  const { password, date: clientDate } = req.body; //save the password gotten from the request from the client
  const passwords = getPasswords(); //to GET the passwords array from the file in JSON object format
  let isValid = false;
  let hasExpired = false;
  let expiryUpdated = false;

  const newPasswords = passwords.map((p) => {
    if (p.password === password) {
      if (p.expired) {
        hasExpired = true;
      } else if (!p.expired) {
        const currentRequestDate = new Date(clientDate);
        const passwordDate = new Date(p.date);

        if (currentRequestDate - passwordDate > 172800000) {
          p.expired = true;
          expiryUpdated = true;
        } else {
          isValid = true;
        }
      }
    }
    return p;
  });

  if (expiryUpdated) {
    setPassword(newPasswords);
    console.log("passwords array updated.");
  }

  if (isValid) {
    res.status(200).json({ message: "Password is correct" });
    console.log("c.logging - Password is correct");
  } else if (expiryUpdated || hasExpired) {
    console.log("c.logging - Password expired");
    res.status(401).json({
      message: "Password has expired. You can re-register for another.",
    });
  } else {
    console.log("c.logging - Password incorrect");
    res
      .status(401)
      .json({ message: "Password is incorrect. Please try again." });
  }
});

module.exports = router;
