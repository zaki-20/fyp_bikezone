import {
  createBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  updateBlog,
} from "../controllers/blogController.js";
import express from "express";
import { tokenAuthentication } from "../middleware/authMiddleware.js";
import { validateBlogData } from "../middleware/blog.middleware.js";
const router = express.Router();

router.route("/create").post(tokenAuthentication, validateBlogData, createBlog);
router.route("/").get(tokenAuthentication, validateBlogData, getAllBlogs);
router.route("/:id").get(tokenAuthentication, validateBlogData, getBlog);
router.route("/:id").delete(tokenAuthentication, validateBlogData, deleteBlog);
router.route("/:id").put(tokenAuthentication, validateBlogData, updateBlog);

export default router;
