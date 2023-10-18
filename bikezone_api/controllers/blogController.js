const Blog = require("../models/blogModel");
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");


//create blog post
exports.createBlog = catchAsyncErrors(async (req, res, next) => {

    const { title, description, category } = req.body;
    const user = req.user;

    const blog = await Blog.create({
        title,
        description,
        category,
        user: user._id,
    });

    res.status(201).json({
        statusCode: 201,
        success: true,
        message: "The blog has been created",
        payload: { blog },
    });
});

exports.getUserPosts = async (req, res, next) => {

    const userId = req.user;

    const userPosts = await Blog.find({ user: userId._id });

    if (!userPosts || userPosts.length === 0) {
        return next(new ErrorHandler("post not found", 404));
    }

    res.status(200).json({
        statusCode: 200,
        success: true,
        message: `Posts by ${userId.firstname} ${userId.lastname}`,
        payload: { userPosts },
    });

};


//get single blog post
exports.getSingleBlog = async (req, res, next) => {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId).populate("user", "firstname lastname email");;
    if (!blog) {
        return next(new ErrorHandler("Blog post not found", 400));
    }
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: "Blog Retrieved",
        payload: { blog },
    });
};


// Like / dislike post
exports.likeDislikePost = async (req, res, next) => {
    const post = await Blog.findById(req.params.id);


    console.log(req.user)
    if (!post.likes.includes(req.user._id)) {
        await post.updateOne({ $push: { likes: req.user._id } });
        res.status(200).json({
            statusCode: 200,
            success: true,
            message: "post has been liked",
            payload: { post },
        });
    } else {
        await post.updateOne({ $pull: { likes: req.user._id } });
        res.status(200).json({
            statusCode: 200,
            success: true,
            message: "post has been disliked",
            payload: { post },
        });
    }
};

exports.getAllBlogs = catchAsyncErrors(async (req, res, next) => {
    const blogs = await Blog.find().populate("user", "firstname lastname email");
    if (!blogs) {
        return next(new ErrorHandler("blog not found", 404));
    }
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: "All Blogs Retrieved",
        payload: { blogs },
    });
});



exports.deleteAllBlogs = catchAsyncErrors(async (req, res, next) => {
    await Blog.deleteMany({});

    res.status(200).json({
        statusCode: 200,
        success: true,
        message: "All blog posts have been deleted.",
    });
});

exports.deleteBlog = catchAsyncErrors(async (req, res) => {
    const blogId = req.params.id;
    await Blog.findByIdAndDelete(blogId);
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: "Blog Deleted Successfully",
        payload: {}
    });
});

