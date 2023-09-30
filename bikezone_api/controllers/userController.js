const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");




//create user  with jwt
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const { firstname, lastname, email, password } = req.body


    const user = await User.create({
        firstname, lastname, email, password,

    })
    // const message = `Thank you ${firstname} ${lastname} for joining BIKEZONE `
    await sendEmail({
        email: email,
        subject: `Bikezone Registration`,
        firstname,
        lastname
    }, 'html');

    const msg = "registered successfully"
    sendToken(user, 200, res, msg)
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
    const msg = "logged in successfully "

    sendToken(user, 200, res, msg)

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
        statusCode: 200,
        status: true,
        message: "Your Account is Logout Successfully",
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
    // console.log(resetToken) 

    await user.save({ validateBeforeSave: false })

    // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Bikezone Password Recovery`,
            message,
        }, 'text');

        res.status(200).json({
            statusCode: 200,
            status: true,
            message: `Email sent to ${user.email} successfully`,
            payload: {}
        });

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error, 500));
    }

})


//Reset password======================================================================
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    // creating token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    //find user having reset hashed token and whose expiry time is grater than current data
    const user = await User.findOne({
        resetPasswordToken, resetPasswordExpire: { $gt: Date.now() },
    });

    //check user exists
    if (!user) {
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired", 400))
    }

    //check bot pass and Cpass which will be sent by the user
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not password", 400));
    }

    //if passwords match and setted undefined for resetTokens because no further usage
    user.newPassword = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    //save after changes in mongodb 
    await user.save();

    const msg = "password resetted successfully"

    sendToken(user, 200, res, msg);

})

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    //check user exists
    if (!user) {
        return next(new ErrorHandler("user not found..", 404))
    }
    res.status(200).json({
        statusCode: 200,
        status: true,
        message: null,
        payload: {
            user
        }
    });
});

// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    //check old password 
    const isPasswordMatch = await user.comparePassword(req.body.oldPassword)

    //check password status
    if (!isPasswordMatch) {
        return next(new ErrorHandler("old password is incorrect", 400))
    }

    //match new password and confirm password
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("password does not match", 400))
    }

    user.password = req.body.newPassword;
    await user.save()

    // res.status(200).json({
    //     statusCode: 200,
    //     status: true,
    //     message: "password has been updated",
    //     payload: {
    //         user
    //     }
    // });
    const msg = "password updated successfully"

    sendToken(user, 200, res, msg);

});

// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {

    const newUserData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
    };

    //we will add cloudinary later

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        statusCode: 200,
        status: true,
        message: "your profile has been updated",
        payload: {
            user
        }
    });

})


// Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});

// Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
        );
    }

    res.status(200).json({
        success: true,
        user,
    });
});

// update User role --admin
exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });

})

// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
        );
    }

    await user.deleteOne();

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    });
});



// Delete All Users (except admin)
exports.deleteAllUsers = catchAsyncErrors(async (req, res, next) => {
    // Delete all users except those with the "admin" role
    await User.deleteMany({ role: { $ne: 'admin' } });

    res.status(200).json({
        success: true,
        message: "All non-admin users have been deleted successfully",
    });
});

