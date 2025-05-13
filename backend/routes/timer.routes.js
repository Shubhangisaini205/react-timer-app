const express = require("express");
const { createTimer, getAllTimers, getTimerById, deleteTimer, updateTimer } = require("../controllers/timer.controller");
const router = express.Router();

router.post("/", createTimer);
router.get("/",getAllTimers);
router.get("/:id",getTimerById);
router.put("/:id",updateTimer);
router.delete("/:id",deleteTimer)

module.exports = router;
