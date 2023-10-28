const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    workshop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workshop",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    slot: {
        type: Number
    },
});

module.exports = mongoose.model("Appointment", appointmentSchema);