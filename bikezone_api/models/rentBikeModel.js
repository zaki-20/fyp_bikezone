const mongoose = require("mongoose") ;

const rentBikeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  model: {
    type: Number,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
//   seller: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User", // Reference to the User model for seller details
//     required: true,
//   },
  contact: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("RentBike", rentBikeSchema);
