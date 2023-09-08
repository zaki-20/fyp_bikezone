const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");


//create user  with jwt
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "this is a sample id",
            url: "profilePicUrl"
        }
    })

    sendToken(user, 200, res)
    // const token = user.getJWTToken()

    // res.status(201).json({
    //     success: true,
    //     token,

    // })

})

//login user 
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    //check if user gives emailand password both
    if (!email || !password) {
        return next(new ErrorHandler("please enter username and password", 400))
    }

    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return next(new ErrorHandler("invalid email or password", 401))
    }

    const isPasswordMatch = await user.comparePassword(password)

    if (!isPasswordMatch) {
        return next(new ErrorHandler("invalid email or password", 401))
    }

    sendToken(user, 200, res)

    // const token = user.getJWTToken()

    // res.status(200).json({
    //     success: true,
    //     token
    // })

})

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

//forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    //check user exist
    if (!user) {
        return next(new ErrorHandler("user not found", 404))
    }
    const resetToken = await user.getResetPasswordToken()
    console.log(resetToken)

    await user.save({ validateBeforeSave: false })

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    console.log(req.get("host"))

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Bikezone Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error, 500));
    }

})
