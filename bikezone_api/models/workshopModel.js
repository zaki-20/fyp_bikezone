const mongoose =  require("mongoose");

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
  // owner: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  timeSlots: [
    {
      // user: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "User",
      //   required: true,
      // },
      startTime: {
        type: Date,
        required: true,
      },
      endTime: {
        type: Date,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Workshop", workshopSchema);