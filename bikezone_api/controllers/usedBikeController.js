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

//get all used-bikes 
exports.getAllUsedBikes = catchAsyncErrors(async (req, res, next) => {
  // Get all used bikes
  const usedBikes = await UsedBike.find();

  if (!usedBikes || usedBikes.length === 0) {
    return next(new ErrorHandler("No used bike ads found", 404));
  }

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "All used bikes ads retrieved for admin",
    payload: { usedBikes },
  });
});

// get detail of used bike
exports.getUsedBikeDetail = catchAsyncErrors(async (req, res, next) => {
  const usedBikeId = req.params.id;
  const usedBike = await UsedBike.findById(usedBikeId).populate({
    path: 'seller',
    select: 'firstname lastname email imageURL createdAt role', // Select the fields you want from the seller object
  });

  if (!usedBike) {
    return next(new CustomError("used bike ad not found", 404));
  }

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "used Bike ad retrieved",
    payload: { usedBike },
  });
});


// get all my used bike ads
exports.getMyUsedBikes = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
  const usedBikes = await UsedBike.find({ seller: userId });

  if (!usedBikes) {
    return next(new ErrorHandler("No used bikes found for the logged-in user", 404));
  }

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "All used bikes for the logged-in user retrieved",
    payload: { usedBikes },
  });

});


exports.deleteUsedBike = async (req, res, next) => {
  const usedBikeId = req.params.id;

  const deletedUsedBike = await UsedBike.findByIdAndDelete(usedBikeId);

  if (!deletedUsedBike) {
    return next(new ErrorHandler("Rental bike ad not found", 404));
  }

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Rent ad deleted successfully",
    payload: {}
  });
};


//update used bike ad
exports.updateUsedBike = catchAsyncErrors(async (req, res, next) => {
  let usedBike = await UsedBike.findById(req.params.id);

  if (!usedBike) {
    return next(new ErrorHandler("Rental bike ad not found", 404));
  }

  usedBike = await UsedBike.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  await usedBike.save();

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "used bike ad updated successfully",
    payload: { usedBike },
  });
});