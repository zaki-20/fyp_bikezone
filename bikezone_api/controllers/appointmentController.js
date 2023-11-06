const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Appointment = require("../models/appointmentModel.js");
const workshopModel = require("../models/workshopModel");
const sendEmail = require("../utils/sendEmail");


exports.createAppointment = catchAsyncErrors(async (req, res, next) => {
    const { workshop, day, slot } = req.body;
    const user = req.user;

    const existingWorkshop = await workshopModel.findById(workshop);

    if (!existingWorkshop) {
        return next(new ErrorHandler("Workshop not found", 404));
    }

    // Check if the requested day and slot are available
    const daySlots = existingWorkshop.weeklySlots.find(daySlots => daySlots.day === day);
    if (!daySlots || !daySlots.slots.includes(slot)) {
        return next(new ErrorHandler("Requested slot is not available for the specified day", 400));
    }

    // Check if the user already has an appointment at this slot
    const existingAppointment = await Appointment.findOne({ workshop, day, slot, user: user._id });
    if (existingAppointment) {
        return next(new ErrorHandler("You already have an appointment at this slot", 400));
    }

    // Remove the slot from the specified day in weeklySlots
    const updatedWeeklySlots = existingWorkshop.weeklySlots.map(daySlots => {
        if (daySlots.day === day) {
            return {
                day: day,
                slots: daySlots.slots.filter(s => s !== slot),
            };
        }
        return daySlots;
    });

    existingWorkshop.weeklySlots = updatedWeeklySlots;

    const appointment = await Appointment.create({
        workshop,
        day,
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
        day: `${day}`,
        workshopName: `${existingWorkshop.name}`,
        workshopContact: `${existingWorkshop.contact}`,
        workshopContactLink: `https://api.whatsapp.com/send?phone=+92${existingWorkshop.contact}`,
        bookingSlot: 'Your booking slot data',
    }, 'html');


    res.status(201).json({
        statusCode: 201,
        success: true,
        message: "The appointment has been created successfully",
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







