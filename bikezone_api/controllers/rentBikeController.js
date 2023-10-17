const RentBike = require("../models/rentBikeModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.createRentBike = catchAsyncErrors(async (req, res, next) => {

    const { title, description, price, model, condition, location, contact } =
        req.body;

    const rentBike = await RentBike.create({
        title,
        description,
        price,
        model,
        condition,
        location,
        //   seller: req.user._id, // Assuming you have user authentication in place
        contact,
    });

    res.status(201).json({
        statusCode: 201,
        success: true,
        message: "Rent Bike ad created successfully",
        payload: { rentBike },
    });

});

exports.updateRentBike = catchAsyncErrors(async (req, res, next) => {
    let rentBike = await RentBike.findById(req.params.id)

    if (!rentBike) {
        return next(new ErrorHandler("Rental bike ad not found", 404));
    }

    rentBike = await RentBike.findByIdAndUpdate(
        req.params.id, req.body,
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    // await rentBike.save();
    res.status(200).json({
        statusCode: 200,
        success: true,
        message: "Rent ad updated successfully",
        payload: { rentBike },
    });

});

exports.deleteRentBike = async (req, res, next) => {

    const rentAdId = req.params.id;

    const deletedRentBike = await RentBike.findByIdAndDelete(rentAdId);

    if (!deletedRentBike) {
        return next(new ErrorHandler("Rental bike ad not found", 404));
    }

    res.status(200).json({
        statusCode: 200,
        success: true,
        message: "Rent ad deleted successfully",
    });
};

exports.getAllRentBikes = catchAsyncErrors(async (req, res, next) => {

    const rentBikes = await RentBike.find();

    if (!rentBikes) {
        return next(new ErrorHandler("rental bikes not found", 404));
    }

    res.status(200).json({
        statusCode: 200,
        success: true,
        message: "All rent ads retrieved",
        payload: { rentBikes },
    });

});

exports.getRentBikeDetails = catchAsyncErrors(async (req, res, next) => {
    const rentAdId = req.params.id;
    const rentBike = await RentBike.findById(rentAdId);

    if (!rentBike) {
        return next(new CustomError("Rental bike ad not found", 404));
    }

    res.status(200).json({
        statusCode: 200,
        success: true,
        message: "Rent ad retrieved",
        payload: { rentBike },
    });

});
