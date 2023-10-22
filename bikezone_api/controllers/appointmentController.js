const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Appointment = require("../models/appointmentModel.js");

//create appointment
exports.createAppointment = catchAsyncErrors(async (req, res, next) => {

    const { workshop, bike } = req.body;
    const user = req.user;

    const request = await Appointment.create({
        workshop,
        bike,
        user: user._id,
    });

    res.status(201).json({
        statusCode: 201,
        success: true,
        message: "The appointment has been sent",
        payload: { request },
    });
});

//zruri ni
exports.updateAppointment = catchAsyncErrors(async (req, res, next) => {
    let updAppointment = await Appointment.findById(req.params.id);
    if (!updAppointment) {
      return next(new ErrorHandler("Can't find any appointment", 404));
    }
    updAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      updAppointment,
    });
  });
