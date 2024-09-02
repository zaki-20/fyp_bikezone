const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

//create new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;


  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  console.log(orderItems)
  
  res.status(201).json({
    statusCode: 201,
    status: true,
    message: `order created successfully`,
    payload: {
      order
    }
  });

})

<<<<<<< HEAD
  res.status(201).json({
    success: true,
    order,
  });
});

//get single order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
<<<<<<< HEAD
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
=======
    const order = await Order.findById(req.params.id).populate("user", "firstname lastname email")
>>>>>>> 0fada1d1e6f966035f941959c4ddc68e3f18b1aa
=======
//get single order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "firstname lastname email")
>>>>>>> 2cfb89e0c75af59066558a77ee8f29cbba6dea7f

  if (!order) {
    return next(new ErrorHandler("order not found with this id", 404));
  }

<<<<<<< HEAD
<<<<<<< HEAD
  res.status(200).json({
    status: true,
    order,
  });
});
=======
    res.status(200).json({
        statusCode: 200,
        status: true,
        message: `order fetched sucessfully`,
        payload: {
            order
        }
    });
})
>>>>>>> 0fada1d1e6f966035f941959c4ddc68e3f18b1aa
=======
  res.status(200).json({
    statusCode: 200,
    status: true,
    message: `order fetched sucessfully`,
    payload: {
      order
    }
  });
});
>>>>>>> 2cfb89e0c75af59066558a77ee8f29cbba6dea7f

//get logged in user order
exports.myOrder = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

<<<<<<< HEAD
<<<<<<< HEAD
  res.status(200).json({
    success: true,
    orders,
  });
=======
    const orders = await Order.find({ user: req.user._id });

    res.status(201).json({
        statusCode: 200,
        status: true,
        message: `order created successfully`,
        payload: {
            orders
        }
    });
>>>>>>> 0fada1d1e6f966035f941959c4ddc68e3f18b1aa
=======
  const orders = await Order.find({ user: req.user._id });

  res.status(201).json({
    statusCode: 200,
    status: true,
    message: `order created successfully`,
    payload: {
      orders
    }
  });
>>>>>>> 2cfb89e0c75af59066558a77ee8f29cbba6dea7f
});

// get all Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
<<<<<<< HEAD
    success: true,
    totalAmount,
    orders,
=======
    statusCode: 200,
    status: true,
    message: `order retrieved successfully`,
    payload: {
      orders,
      totalAmount,
    }
>>>>>>> 2cfb89e0c75af59066558a77ee8f29cbba6dea7f
  });
});

// update Order status  -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("you have already delieverd this order", 400));
  }
<<<<<<< HEAD

  order.orderItems.forEach(async (o) => {
    await updateStock(o.product, o.quantity, next);
  });

  order.orderStatus = req.body.status;

  if (req.body.status === "delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//Fucntion for update stock===========
async function updateStock(id, quantity, next) {
<<<<<<< HEAD
  const product = await Product.findById(id);
=======

    const product = await Product.findById(id);
>>>>>>> 0fada1d1e6f966035f941959c4ddc68e3f18b1aa

  // if (quantity > product.Stock) {
  //   return next(new ErrorHandler("Insufficient stock", 400));
  // }
  product.Stock -= quantity;

<<<<<<< HEAD
  await product.save({ validateBeforeSave: false });
=======
    await product.save({ validateBeforeSave: false });
>>>>>>> 0fada1d1e6f966035f941959c4ddc68e3f18b1aa
}

=======

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o._id, o.quantity);
    });
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    statusCode: 200,
    status: true,
    message: `order updated successfully`,
    payload: {}
  });
});

>>>>>>> 2cfb89e0c75af59066558a77ee8f29cbba6dea7f
// delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  await order.deleteOne();

  res.status(200).json({
<<<<<<< HEAD
    success: true,
  });
});
=======
    statusCode: 200,
    status: true,
    message: `order deleted successfully`,
    payload: {}
  });
});

//Fucntion for update stock===========
async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.Stock -= quantity;
  await product.save({ validateBeforeSave: false });
}
>>>>>>> 2cfb89e0c75af59066558a77ee8f29cbba6dea7f
