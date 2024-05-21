const express = require("express")
const router = express.Router();
const { getPasswords } = require("./passwords")

router.route("/").get((req, res) => {
    res.status(200).json(getPasswords());
})

module.exports = router;