const express = require("express");
const { createWorkshop, updateWorkshop, deleteWorkshop, getAllWorkshops, getWorkshopDetails, getMyWorkshopDetails } = require("../controllers/workshopController")
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const router = express.Router()



router.route("/workshops").get(getAllWorkshops)
router.route("/workshops/me").get(isAuthenticatedUser, getMyWorkshopDetails)

router.route("/workshop/new").post(isAuthenticatedUser, createWorkshop)
router.route("/workshop/:id")
    .get(getWorkshopDetails)
    .delete(isAuthenticatedUser, deleteWorkshop)

router.route("/workshop/update/:id")
    .put(isAuthenticatedUser, updateWorkshop)



module.exports = router


