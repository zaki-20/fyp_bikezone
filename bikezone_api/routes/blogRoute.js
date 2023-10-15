const express = require("express");
const { createBlog, getUserPosts, getSingleBlog } = require("../controllers/blogController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

//create new product
router.route("/blog/new").post(isAuthenticatedUser, createBlog);
router.route("/blog/me").get(isAuthenticatedUser, getUserPosts);
router.route("/blog/:id").get(isAuthenticatedUser, getSingleBlog);



module.exports = router;