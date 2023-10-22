const mongoose = require("mongoose");
const validator = require("validator");

const workshopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  brand: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  appointment: {
    type: Array,
    default: [],
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  totalAppointments: {
    type: Number
  },
  slots: {
    type: Number,
    required: true,
    maxLength: [24],
    minLength: [1]
  },
  service1: {
    type: String,
  },
  service2: {
    type: String,
  },
  service3: {
    type: String,
  },
  service4: {
    type: String,
  },
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    }
  ],
  maxAppointments: {
    type: Number,
    required: true
  }

});

module.exports = mongoose.model("Workshop", workshopSchema);