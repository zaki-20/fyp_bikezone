const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Appointment = require("../models/appointmentModel.js");
const workshopModel = require("../models/workshopModel");
const sendEmail = require("../utils/sendEmail");


exports.createAppointment = catchAsyncErrors(async (req, res, next) => {
    const { workshop, slot } = req.body;
    const user = req.user;

    const existingWorkshop = await workshopModel.findById(workshop);

    if (!existingWorkshop) {
        return next(new ErrorHandler("Workshop not found", 404));
    }

    const appointment = await Appointment.create({
        workshop,
        slot,
        user: user._id,
    });

    // Update the workshop's appointment array with the new appointment
    existingWorkshop.appointments.push(appointment);

    await existingWorkshop.save();

    await sendEmail({
        email: user.email,
        subject: 'Appointment Confirmation',
        firstname: user.firstname,
        lastname: user.lastname,
        slot: slot,
        timing: `${slot}:00 - ${slot + 1}:00`,
        workshopName: `${existingWorkshop.name}`,
        workshopContact: `${existingWorkshop.contact}`,
        workshopContactLink: `https://api.whatsapp.com/send?phone=+92${existingWorkshop.contact}`,
        bookingSlot: 'Your booking slot data',
    }, 'html');

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







