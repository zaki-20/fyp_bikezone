const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Product = require("../models/productModel");
const ApiFeatres = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler")


//create product --admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    req.body.user = req.user.id
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product,
    });
});

// Get All Product
exports.getAllProducts = catchAsyncErrors(async (req, res) => {

    const resultPerPage = 2;

    const apiFeatures = new ApiFeatres(Product.find(), req.query).search().filter().pagination(resultPerPage)

    const products = await apiFeatures.query;

  if (!products || products.length === 0) {
    return next(new ErrorHandler("product not found", 404));
  }
    res.status(200).json({
        sucess: true,
        length: products.length,
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
  
  // Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});
