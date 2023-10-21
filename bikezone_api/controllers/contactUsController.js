const ErrorHandler = require("../utils/errorHandler");
const Contact = require("../models/contactUsModel");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.createContact = catchAsyncErrors(async (req, res, next) => {

    const { name, email, subject, message } = req.body;

    const contact = await Contact.create({ name, email, subject, message });

    return res.status(200).json({
        statusCode: 200,
        status: true,
        message: "Query Sent",
        payload: {
            contact,
        },
    });
});

exports.getAllContacts = catchAsyncErrors(async (req, res, next) => {
    const contacts = await Contact.find();
    if (!contacts) {
        return next(new ErrorHandler("query not found", 400));
    }
    return res.status(200).json({
        statusCode: 200,
        status: true,
        message: "All contact us queries has been fetched",
        payload: {
            contacts,
        },
    });
});
