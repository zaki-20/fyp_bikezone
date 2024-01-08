const mongoose = require("mongoose");
const validator = require("validator");

const rentBikeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  rent: {
    type: Number,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
    enum: ['new', 'used'], // You can customize the conditions based on your needs
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    // required: true,
  },
  availableFromDate: {
    type: Date,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("RentBike", rentBikeSchema);
