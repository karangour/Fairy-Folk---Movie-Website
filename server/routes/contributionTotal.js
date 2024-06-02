const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "contributionTotal.json");

router.route("/").post((req, res) => {
  try {
    const amount = parseInt(req.body.newTotal, 10);
    console.log(amount);

    fs.writeFileSync(filePath, JSON.stringify(amount), "utf-8");
    res.json({ message: "Contribution stores successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server error while process the request" });
  }
});

router.route("/").get((req, res) => {
  try {
    const currentTotal = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    res.json(currentTotal);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch from contributionTotal!" });
  }
});

module.exports = router;
