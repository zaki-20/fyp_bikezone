const express = require("express");
const { createAppointment, updateAppointment } = require("../controllers/appointmentController")
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const router = express.Router()


router.route("/workshops/appointments").post(isAuthenticatedUser, createAppointment)

module.exports = router


