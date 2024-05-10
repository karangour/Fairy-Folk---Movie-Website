const express = require("express");
const router = express.Router();
// Contacts is our controller handling all the logic
const contact = require("../controllers/contactController");

router.route("/").get(contact.getContact).post(contact.createContact);

router.route("/:id").get(contact.getIDContact).put(contact.putIDContact).delete(contact.deleteIDContact);

module.exports = router;
