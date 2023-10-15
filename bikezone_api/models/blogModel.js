const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Store user references who liked the blog
    comment: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User who commented
            text: String,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Blog", blogSchema);