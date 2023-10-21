const express = require("express");
const { createWorkshop, updateWorkshop, deleteWorkshop, getAllWorkshops, getWorkshopDetails } = require("../controllers/workshopController")
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const router = express.Router()



router.route("/workshops").get(isAuthenticatedUser, getAllWorkshops)

router.route("/workshop/new").post(isAuthenticatedUser, createWorkshop)
router.route("/workshop/:id")
    .get(getWorkshopDetails)
    .put(isAuthenticatedUser, updateWorkshop)
    .delete(isAuthenticatedUser, deleteWorkshop)


module.exports = router


