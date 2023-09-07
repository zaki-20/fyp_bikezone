const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler")


//create product --admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    // req.body.user = req.user.id
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product,
    });
});

// Get All Product
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
    const products = await Product.find();
    res.status(200).json({
        sucess: true,
        products
    })

})


//get product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {


    const product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHandler("product not found", 404));
    }
    res.status(200).json({
      success: true,
      product,
    });
  });

//update products --Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("product not found", 404));
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
      product,
    });
  });


  //delete product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("product not found", 404));
    }
    await product.deleteOne();
    res.status(200).json({
      success: true,
      message: "product has been deleted ",
    });
  });
  