const express = require("express");
const { createAppointment, getSingleAppointment } = require("../controllers/appointmentController")
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const router = express.Router()


router.route("/workshops/appointment/new").post(isAuthenticatedUser, createAppointment)
router.route("/workshops/appointment/:id").get(isAuthenticatedUser, getSingleAppointment)

module.exports = router