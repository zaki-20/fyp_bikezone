const Workshop = require("../models/workshopModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");


exports.createWorkshop = catchAsyncErrors(async (req, res, next) => {

    const { name, brand, city, contact, timeSlots, address } = req.body;
    // const owner = req.user.id; 

    const workshop = await Workshop.create({
        name,
        brand,
        timeSlots,
        address,
        city,
        contact,
    });

    res.status(201).json({
        statusCode: 201,
        success: true,
        message: "Workshop created successfully",
        payload: { workshop },
    });

});

exports.updateWorkshop = catchAsyncErrors( async (req, res, next) => {
 
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

exports.deleteWorkshop = catchAsyncErrors( async (req, res, next) => {
  
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

// export const getAllWorkshops = async (req, res, next) => {
//   try {
//     const workshops = await Workshop.find();

//     res.status(200).json({
//       statusCode: 200,
//       success: true,
//       message: "All workshops retrieved successfully",
//       payload: { workshops },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getWorkshopById = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const workshop = await Workshop.findById(id);

//     if (!workshop) {
//       return next(new ErrorHandler("Workshop not found", 404));
//     }

//     res.status(200).json({
//       statusCode: 200,
//       success: true,
//       message: "Workshop retrieved successfully",
//       payload: { workshop },
//     });
//   } catch (error) {
//     next(error);
//   }
// };
