const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const { createUsedBikeAd } = require("../controllers/usedBikeController");
const router = express.Router()


router.route("/usedbike/new").post(isAuthenticatedUser, createUsedBikeAd)


module.exports = router


