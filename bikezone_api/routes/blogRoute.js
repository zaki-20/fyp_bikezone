const express = require("express");
const { createBlog } = require("../controllers/blogController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

//create new product
router.route("/blog/new").post(isAuthenticatedUser,  createBlog);



module.exports = router;