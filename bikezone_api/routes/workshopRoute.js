const express = require("express");
const { createWorkshop, updateWorkshop, deleteWorkshop } = require("../controllers/workshopController")
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const router = express.Router()


router.route("/admin/workshop/new").post(createWorkshop)
router.route("/admin/workshop/:id")
    .put(updateWorkshop)
    .delete(deleteWorkshop)


module.exports = router
