const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    workshop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workshop",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workshop",
        required: true,
    },
    bike:{
        type:String,
        required: true,
    }
});

module.exports = mongoose.model("Appointment", appointmentSchema);
