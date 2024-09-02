const express = require("express");
<<<<<<< HEAD
const { createAppointment, updateAppointment } = require("../controllers/appointmentController")
=======
const { createAppointment, getSingleAppointment } = require("../controllers/appointmentController")
>>>>>>> 2cfb89e0c75af59066558a77ee8f29cbba6dea7f
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const router = express.Router()


<<<<<<< HEAD
router.route("/workshops/appointments").post(isAuthenticatedUser, createAppointment)

module.exports = router


=======
router.route("/workshops/appointment/new").post(isAuthenticatedUser, createAppointment)
router.route("/workshops/appointment/:id").get(isAuthenticatedUser, getSingleAppointment)

module.exports = router
>>>>>>> 2cfb89e0c75af59066558a77ee8f29cbba6dea7f
