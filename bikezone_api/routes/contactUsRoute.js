const express = require("express");
const { createContact, getAllContacts } = require("../controllers/contactUsController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/contactus/new")
    .post(createContact)

router.route("/contacts")
    .get(getAllContacts)


module.exports = router;