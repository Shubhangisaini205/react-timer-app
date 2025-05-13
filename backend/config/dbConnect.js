const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        await mongoose.connect("mongodb+srv://shubhangi:saini@cluster0.fatrmgn.mongodb.net/TimerApp");
        console.log(" MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);m
    }
};

module.exports = dbConnect;
