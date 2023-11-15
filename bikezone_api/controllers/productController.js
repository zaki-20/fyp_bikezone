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
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatres(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  let products = await apiFeature.query;

  let filteredProductsCount = products.length;

  if (!products || products.length === 0) {
    return next(new ErrorHandler("product not found", 404));
  }

  res.status(200).json({
    statusCode: 200,
    status: true,
    message: "All products have been fetched!",
    payload: {
      products: {
        products,
        length: products.length,
        resultPerPage,
        productsCount,
        filteredProductsCount

      }
    }
  })

})


//get product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  res.status(200).json({
    statusCode: 200,
    status: true,
    message: "product detail has been fetched!",
    payload: {
      product
    }
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
    imageURL: req.user.imageURL,
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    rating: Number(rating),
    comment,
  };
  console.log(review)

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

  console.log(product)
  res.status(200).json({
    statusCode: 200,
    status: true,
    message: "your review have been submitted!",
    payload: {}
  });
});

exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

exports.getRatingProducts = async (req, res, next) => {

  const minRating = 4; // Define the minimum rating you want to filter by

  const products = await Product.find({ ratings: { $gte: minRating } });

  if (!products) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    statusCode: 200,
    status: true,
    message: "Rating products retrieved!",
    payload: { products }
  });

};


// get reviewd products
exports.getProductsWithReviews = async (req, res, next) => {

  const products = await Product.find({ reviews: { $exists: true, $not: { $size: 0 } } });

  if (!products) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    statusCode: 200,
    status: true,
    message: "Reviewd products retrieved!",
    payload: { products }
  });

};

exports.getNewArrivalProducts = catchAsyncErrors(async (req, res, next) => {

  const today = new Date(); // Get the current date
  const threeDaysAgo = new Date(today);
  threeDaysAgo.setDate(today.getDate() - 3); // Calculate the date 3 days ago

  const products = await Product.find({
    createdAt: { $gte: threeDaysAgo, $lte: today },
  });

  if (!products) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    statusCode: 200,
    status: true,
    message: "new arrival products retrieved!",
    payload: { products }
  });

});



