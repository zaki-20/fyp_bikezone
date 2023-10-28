const express = require("express");
const { createBlog, getUserPosts, getSingleBlog, likeDislikePost, getAllBlogs, deleteAllBlogs, deleteBlog } = require("../controllers/blogController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/blogs")
    .get(getAllBlogs)
    .delete(isAuthenticatedUser, deleteAllBlogs);

router.route("/blog/new").post(isAuthenticatedUser, createBlog);

router.route("/blog/me").get(isAuthenticatedUser, getUserPosts);

router.route("/blog/:id")
    .get(isAuthenticatedUser, getSingleBlog)
    .delete(isAuthenticatedUser, deleteBlog);

router.route("/blog/:id/like").put(isAuthenticatedUser, likeDislikePost);


module.exports = router;