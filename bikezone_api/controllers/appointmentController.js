const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Appointment = require("../models/appointmentModel.js");
const workshopModel = require("../models/workshopModel");

//create appointment
exports.createAppointment = catchAsyncErrors(async (req, res, next) => {

    const { workshop, bike, slot } = req.body;
    const user = req.user;

    const existingWorkshop = await workshopModel.findById(workshop);

    if (existingWorkshop.appointments.length >= existingWorkshop.totalAppointments) {
        // Check if the number of existing appointments exceeds the maximum slots
        return next(new ErrorHandler("Slots are full", 400)); // You can choose an appropriate HTTP status code
    }

    if (!existingWorkshop) {
        return next(new ErrorHandler("Workshop not found", 404));
    }

    const appointment = await Appointment.create({
        workshop,
        bike,
        slot,
        user: user._id,
    });

    // Update the workshop's appointment array with the new appointment
    existingWorkshop.appointments.push(appointment);
    await existingWorkshop.save();


    res.status(201).json({
        statusCode: 201,
        success: true,
        message: "The appointment has been sent",
        payload: { appointment },
    });
});


exports.getSingleAppointment = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    const appointment = await Appointment.findById(id)

    if (!appointment) {
        return next(new ErrorHandler("Appointment not found", 404));
    }

    res.status(200).json({
        statusCode: 200,
        success: true,
        message: "Appointment retrieved successfully",
        payload: { appointment },
    });
});







