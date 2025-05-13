const TimerModel = require("../models/timer.models");
const createTimer = async (req, res) => {
    try {
        const { name, duration, category, status } = req?.body;

        if (!name || !duration || !category || !status) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newTimer = await TimerModel.create({ name, duration, category, status });

        res.status(201).json(newTimer);
    } catch (error) {
        console.error("Error creating timer:", error);
        res.status(500).json({ message: "Server error" });
    }
};


const getAllTimers = async (req, res) => {
  try {
     const { category } = req.query;
    const filter = category ? { category } : {};
    const timers = await TimerModel.find();
    res.status(200).json(timers);
  } catch (error) {
    res.status(500).json({ message: "error while fetching all timers" });
  }
};


const getTimerById = async (req, res) => {
  try {
    const timer = await TimerModel.findById(req.params.id);
    if (!timer) {
      return res.status(404).json({ message: "Timer not found" });
    }
    res.status(200).json(timer);
  } catch (error) {
    res.status(500).json({ message: "Error while fetching single timer" });
  }
};


const updateTimer = async (req, res) => {
  try {
    const { name, duration, category, status } = req.body;
    const updatedTimer = await TimerModel.findByIdAndUpdate(
      req.params.id,
      { name, duration, category, status }
    );
    if (!updatedTimer) {
      return res.status(404).json({ message: "Timer not found" });
    }
    res.status(200).json(updatedTimer);
  } catch (error) {
    res.status(500).json({ message: "Error while updating timer" });
  }
};

const deleteTimer = async (req, res) => {
  try {
    const deleted = await TimerModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Timer not found" });
    }
    res.status(200).json({ message: "Timer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error while deleting timer" });
  }
};

module.exports = {
  createTimer,
  getAllTimers,
  getTimerById,
  updateTimer,
  deleteTimer
};

