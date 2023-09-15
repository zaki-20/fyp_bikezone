const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const { createRentBike, getAllRentBikes, getRentBikeDetails, updateRentBike, deleteRentBike } = require("../controllers/rentBikeController");
const router = express.Router();

//create new rentBike ad
router.route("/rentbike/new").post(createRentBike);
router.route("/rentbikes").get(getAllRentBikes);

router.route("/rentbike/:id")
    .get(getRentBikeDetails)
    .put(updateRentBike)
    .delete(deleteRentBike);




module.exports = router