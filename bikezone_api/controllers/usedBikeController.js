const UsedBike = require("../models/usedBikeModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

//To create a new bike ad
exports.createUsedBikeAd = catchAsyncErrors(async (req, res, next) => {
    const {
        title,
        description,
        email,
        price,
        brand,
        model,
        year,
        condition,
        mileage,
        address,
        city,
        contact,
        images,
        isAvailable
    } = req.body;

    const seller = req.user._id;

    // Create a new bike ad
    const usedBikeAd = new UsedBike({
        title,
        description,
        email,
        price,
        brand,
        model,
        year,
        condition,
        mileage,
        address,
        city,
        seller,
        contact,
        images,
        isAvailable
    });

    // Save the new bike ad to the database
    await usedBikeAd.save();

    res.status(201).json({
        statusCode: 201,
        success: true,
        message: "Bike ad created successfully",
        payload: { usedBikeAd },
    });
});