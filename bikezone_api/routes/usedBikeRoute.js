const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const { createUsedBikeAd, getAllUsedBikes, getUsedBikeDetail, getMyUsedBikes, updateUsedBike, deleteUsedBike } = require("../controllers/usedBikeController");
const router = express.Router()


router.route("/usedbike/new").post(isAuthenticatedUser, createUsedBikeAd)

router.route("/usedbikes").get(getAllUsedBikes)

router.route("/usedbikes/me").get(isAuthenticatedUser, getMyUsedBikes)

router.route("/usedbike/:id")
    .get(isAuthenticatedUser, getUsedBikeDetail)
    .put(isAuthenticatedUser, updateUsedBike)
    .delete(isAuthenticatedUser, deleteUsedBike)

module.exports = router