const mongoose = require("mongoose");

const workshopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
    default:[],
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  startTime: {
    type: Number,
    required: true,
    maxLength:[24],
    minLenght:[1]
  },
  endTime: {
    type: Number,
    required: true,
    maxLength:[24],
    minLength:[1]
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
  appointments:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    }
  ],
  maxAppointments:{
    type:Number,
    required: true
  }
  // requests:[{
  //   name: String,
  //   time: Date,
  //   appointment: [{
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Appointment",
  //   }]
  // }]
});

module.exports = mongoose.model("Workshop", workshopSchema);
