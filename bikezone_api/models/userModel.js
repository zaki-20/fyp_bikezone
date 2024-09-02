const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please Enter Your firstname"],
        maxLength: [15, "Name cannot exceed 15 characters"],
        minLength: [3, "firstname should have more than 4 characters"],
    },
    lastname: {
        type: String,
        required: [true, "Please Enter Your lastname"],
        maxLength: [15, "Name cannot exceed 15 characters"],
        minLength: [3, "fisrtname should have more than 4 characters"],
    },
    imageURL: String,
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false,
    },

    role: {
        type: String,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,

    isVerified: {
        type: Boolean,
        default: false,
    },
    emailVerificationOTP: String,
    emailVerificationExpiry: Date,
});

//password hash before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//generate Token for authentication 
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '5d'
    })
}

//compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//generating password reset token
userSchema.methods.getResetPasswordToken = async function () {

    // create random bytes
    const resetToken = crypto.randomBytes(32).toString("hex");

    //hashings and add to userSchema 
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000
    return resetToken

}

userSchema.methods.generateEmailVerificationOTP = function () {
    const otp = Math.floor(1000 + Math.random() * 9000); // A random 4-digit OTP
    this.emailVerificationOTP = otp;
    this.emailVerificationExpiry = Date.now() + 1 * 60 * 1000; // OTP expires after 1 minute
    return otp;
}

userSchema.methods.resendEmailVerificationOTP = function () {
    // Check if the previous OTP has expired
    if (this.emailVerificationExpiry && this.emailVerificationExpiry > Date.now()) {
        throw new Error("Previous OTP is still valid. Please wait before requesting a new one.");
    }

    // Regenerate OTP and update the existing user with the new OTP
    this.emailVerificationOTP = this.generateEmailVerificationOTP();

    // Allow resend after 10 seconds and set the expiry time to 1 minute from now
    this.emailVerificationExpiry = Date.now() + 1 * 60 * 1000;

    this.save(); // Save the user with the new OTP
    return this.emailVerificationOTP;
}


module.exports = mongoose.model("User", userSchema);