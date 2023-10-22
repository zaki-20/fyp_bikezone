const Workshop = require("../models/workshopModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");



exports.createWorkshop = catchAsyncErrors(async (req, res, next) => {

    const { name, brand, city, contact, address, startTime, endTime, service1, service2, service3, service4, appointment, maxAppointments } = req.body;
    const owner = req.user._id;
    let workingHours = endTime - startTime;
    let slots = workingHours;

    let totalAppointments = (maxAppointments * slots); // maxAppointments is maximun for 1 hour. e.g 3 & slots= 7 so, 21 appointments, 3 in each hour. The max count of slot will be 3.


    const workshop = await Workshop.create({
        name,
        brand,
        city,
        contact,
        address,
        owner,
        service1,
        service2,
        service3,
        service4,
        appointment,
        slots,
        maxAppointments,
        totalAppointments
    });
    res.status(201).json({
        statusCode: 201,
        success: true,
        message: "Workshop created successfully",
        payload: { workshop },
    });

});

// exports.createWorkshop = catchAsyncErrors(async (req, res, next) => {
//     const { name, brand, city, contact, address, timeSlots, service1, service2, service3, service4 } = req.body;
//     const owner = req.user._id;

//     const workshop = await Workshop.create({
//         name,
//         brand,
//         city,
//         contact,
//         address,
//         owner,
//         service1,
//         service2,
//         service3,
//         service4,
//         timeSlots
//     });

//     res.status(201).json({
//         statusCode: 201,
//         success: true,
//         message: "Workshop created successfully",
//         payload: { workshop },
//     });
// });

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
            select: "name brand contact", // Select the fields you want from the workshop object
        },
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
