const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");


exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies

    if (!token) {
        next(new ErrorHandler("please login to access this resource", 401))
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET) 

    req.user = await User.findById(decodeToken.id)

    next()
})

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403))
        }
        next()
    }
}