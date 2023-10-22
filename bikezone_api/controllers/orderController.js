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

    //  let { _id, name, price, quantity } = orderitem

    // const orderItems = {
    //     product: _id,
    //     name,
    //     price,
    //     quantity
    // }

    // console.log(orderItems)

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

    res.status(201).json({
        statusCode: 201,
        status: true,
        message: `order created successfully`,
        payload: {
            order
        }
    });

})

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

  if (!order) {
    return next(new ErrorHandler("order not found with this id", 404));
  }

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

//get logged in user order
exports.myOrder = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

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
});

// get all Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
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

// delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
});
