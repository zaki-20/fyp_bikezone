const Workshop = require("../models/workshopModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const moment = require('moment-timezone');



exports.createWorkshop = catchAsyncErrors(async (req, res, next) => {
  const owner = req.user._id;

  const existingWorkshops = await Workshop.find({ owner });

  if (existingWorkshops.length >= 3) {
    return next(new ErrorHandler("Workshop limit reached", 404));
  }

  const { name, email, brand, city, contact, address, startTime, endTime, service1, service2, service3, service4, description, imageURL, offerDate, discount } = req.body;

  const karachiTimezone = 'Asia/Karachi';

  // Create an array to store time slots for each day of the week
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  let slotsArray = [];

  // Generate time slots for each day of the week
  for (const day of daysOfWeek) {
    let daySlots = [];
    for (let i = startTime; i < endTime; i++) {
      daySlots.push(i);
    }
    slotsArray.push({ day, slots: daySlots });
  }

  const offerDateInKarachi = moment.tz(offerDate, karachiTimezone);

  const workshop = await Workshop.create({
    name,
    email,
    brand,
    city,
    contact,
    address,
    owner,
    service1,
    service2,
    service3,
    service4,
    weeklySlots: slotsArray, // Store the time slots for each day of the week
    startTime,
    endTime,
    description,
    imageURL,
    discount,
    offerDate: offerDateInKarachi.toISOString(), // Store the date in ISO format
  });

  return res.status(201).json({
    statusCode: 201,
    success: true,
    message: "Workshop created successfully",
    payload: { workshop },
  });
});


exports.updateWorkshop = catchAsyncErrors(async (req, res, next) => {
  let workshop = await Workshop.findById(req.params.id);

  if (!workshop) {
    return next(new ErrorHandler("Workshop not found", 404));
  }

  workshop = await Workshop.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  await workshop.save();

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Workshop updated successfully",
    payload: { workshop },
  });
});


exports.deleteWorkshop = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const workshop = await Workshop.findByIdAndRemove(id);

  if (!workshop) {
    return next(new ErrorHandler("Workshop not found", 404));
  }

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Workshop deleted successfully",
  });
});


exports.getAllWorkshops = catchAsyncErrors(async (req, res, next) => {
  const workshopCount = await Workshop.countDocuments();
  const workshops = await Workshop.find();

  if (!workshops) {
    return next(new ErrorHandler("Workshop not found", 404));
  }

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "All workshops retrieved successfully",
    payload: { workshops, workshopCount },
  });
});

exports.getWorkshopDetails = async (req, res, next) => {

  const { id } = req.params;

  const workshop = await Workshop.findById(id).populate({
    path: "appointments",
    populate: {
      path: "user",
      select: "firstname lastname email", // Select the fields you want from the user object
    },
  }).populate({
    path: "appointments",
    populate: {
      path: "workshop",
      select: "name brand contact owner", // Select the fields you want from the workshop object
    },
  }).populate({
    path: "owner", // Assuming "owner" is a reference field in the Workshop model
    select: "firstname lastname email imageURL", // Select the fields you want from the owner user object
  });


  if (!workshop) {
    return next(new ErrorHandler("Workshop not found", 404));
  }


  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Workshop retrieved successfully",
    payload: { workshop },
  });

};

exports.getMyWorkshopDetails = catchAsyncErrors(async (req, res, next) => {
  const ownerId = req.user._id;

  const workshop = await Workshop.findOne({ owner: ownerId })
    .populate('owner', 'firstname lastname email') // Populate the owner field
    .populate({
      path: 'appointments',
      populate: {
        path: 'user',
        select: 'firstname lastname email', // Select the fields you want from the user object
      },
    });


  if (!workshop) {
    return next(new ErrorHandler("Workshop not found", 404));
  }

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "My Workshop details retrieved successfully",
    payload: { workshop },
  });
});
