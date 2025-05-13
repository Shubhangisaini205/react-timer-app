const mongoose = require("mongoose")
const timerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    duration: {
        type: Number,
        required: true,
    },
    category: { type: String, required: true },
    status: {
        type: String,
        enum: ['running', 'paused', 'completed'],
        default: 'running',
    },
})


const TimerModel = mongoose.model('timer', timerSchema);

module.exports = TimerModel