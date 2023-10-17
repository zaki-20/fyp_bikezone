const express = require("express");
const { createBlog, getUserPosts, getSingleBlog, likeDislikePost, getAllBlogs, deleteAllBlogs } = require("../controllers/blogController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

//create new product
router.route("/blogs").get(isAuthenticatedUser, getAllBlogs).delete(isAuthenticatedUser, deleteAllBlogs);
router.route("/blog/new").post(isAuthenticatedUser, createBlog);
router.route("/blog/me").get(isAuthenticatedUser, getUserPosts);
router.route("/blog/:id").get(isAuthenticatedUser, getSingleBlog);
router.route("/blog/:id/like").put(isAuthenticatedUser, likeDislikePost);


module.exports = router;