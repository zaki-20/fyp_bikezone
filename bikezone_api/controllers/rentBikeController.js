const RentBike = require("../models/rentBikeModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.createRentBike = catchAsyncErrors(async (req, res, next) => {
  const { title, description, rent, model, email, condition, address, city, contact, availableFromDate, images } =
    req.body;

  const seller = req.user._id;

  // Check if availableFromDate is greater than the current date
  // const currentDate = new Date();
  // const selectedDate = new Date(availableFromDate);

  // if (selectedDate <= currentDate) {
  //   return res.status(400).json({
  //     statusCode: 400,
  //     success: false,
  //     message: "Available from date must be greater than the current date.",
  //   });
  // }

  const rentBike = await RentBike.create({
    title,
    description,
    rent,
    email,
    model,
    condition,
    address,
    city,
    seller,
    contact,
    availableFromDate,
    images,
  });

  res.status(201).json({
    statusCode: 201,
    success: true,
    message: "Rent Bike ad created successfully",
    payload: { rentBike },
  });
});

//get all rent bike ads for users
exports.getAllRentBikes = catchAsyncErrors(async (req, res, next) => {

  // Get the current date
  const currentDate = new Date();

  // Fetch rent bikes with availableFromDate greater than or equal to the current date
  const rentBikes = await RentBike.find({
    availableFromDate: { $lte: currentDate },
  });

  if (!rentBikes || rentBikes.length === 0) {
    return next(new ErrorHandler("No available rental bikes found", 404));
  }

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "All rent ads retrieved",
    payload: { rentBikes },
  });
});


//get all rental-bikes for admin
exports.getAllRentBikesForAdmin = catchAsyncErrors(async (req, res, next) => {

  // Get all rent bikes
  const rentBikes = await RentBike.find();

  if (!rentBikes || rentBikes.length === 0) {
    return next(new ErrorHandler("No rental bikes found", 404));
  }

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "All rent ads retrieved for admin",
    payload: { rentBikes },
  });
});


exports.updateRentBike = catchAsyncErrors(async (req, res, next) => {
  let rentBike = await RentBike.findById(req.params.id);

  if (!rentBike) {
    return next(new ErrorHandler("Rental bike ad not found", 404));
  }

  rentBike = await RentBike.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  await rentBike.save();

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



exports.getRentBikeDetails = catchAsyncErrors(async (req, res, next) => {
  const rentBikeId = req.params.id;
  const rentBike = await RentBike.findById(rentBikeId);

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


// get all my rent bike ads
exports.getMyRentBikes = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;

  const rentBikes = await RentBike.find({ seller: userId });

  if (!rentBikes) {
    return next(new ErrorHandler("No rent bikes found for the logged-in user", 404));
  }

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "All rent bikes for the logged-in user retrieved",
    payload: { rentBikes },
  });
});
