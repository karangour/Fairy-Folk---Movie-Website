const express = require("express")
const router = express.Router()
const { getPasswords, setPassword } = require("./passwords")

router.route("/:id").put((req, res) => {
    const id = req.params.id;
    const passwords = getPasswords();

    

    setPasswords(updatedPasswords)
})

module.exports = router;