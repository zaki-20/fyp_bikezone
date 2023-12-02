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
