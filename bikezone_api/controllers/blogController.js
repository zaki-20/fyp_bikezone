const Blog = require("../models/blogModel");
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");


//create blog post
exports.createBlog = async (req, res, next) => {

    const { title, description } = req.body;
    const user = req.user;

    const blog = await Blog.create({
        title,
        description,
        user: user._id, 
       
    });

    res.status(201).json({
        statusCode: 201,
        success: true,
        message: "The blog has been created",
        payload: {blog},
    });
};

// export const getBlog = async (req, res, next) => {
//   const blogId = req.params.body;
//   const blog = await Blog.findById(blogId);
//   if (!blog) {
//     return next(new CustomError("Can't get the Blog", 400));
//   }
//   res.status(200).json({
//     statusCode: 200,
//     success: true,
//     message: "Blog Retrieved",
//     payload: { blog },
//   });
// };

// export const getAllBlogs = async (req, res, next) => {
//   const blogs = await Blog.find();
//   res.status(200).json({
//     statusCode: 200,
//     success: true,
//     message: "All Blogs Retrieved",
//     payload: { blogs },
//   });
// };

// export const deleteBlog = async (req, res) => {
//   const blogId = req.params.id;
//   await Blog.findByIdAndDelete(blogId);
//   res.status(200).json({
//     statusCode: 200,
//     success: true,
//     message: "Blog Deleted Successfully",
//   });
// };

// export const updateBlog = async (req, res) => {
//   const blogId = req.params.id;
//   const { title, description, user } = req.body;

//   const updatedBlog = await Blog.findByIdAndUpdate(
//     blogId,
//     { title, description, user },
//     { new: true }
//   );
//   res.status(200).json({
//     statusCode: 200,
//     success: true,
//     message: "Blog has been updated Successfully",
//     payload: { updatedBlog },
//   });
// };