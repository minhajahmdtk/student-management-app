const express = require("express");
const router = express.Router();
const feedbackModels = require("../models/feedbackModel");

// Add Feedback

router.post("/add", async (req, res) => {
  try {
    const { email, course, feedback } = req.body;
    if (!email || email.trim() === "") {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }


    if (!course || course.trim() === "") {
      return res.status(400).json({
        message: "Course is required",
      });
    }


    if (!feedback || feedback.trim() === "") {
      return res.status(400).json({
        message: "Feedback cannot be empty",
      });
    }

    const newFeedback = new feedbackModels({
      email,
      course,
      feedback,
    });

    await newFeedback.save();

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback: newFeedback,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const feedback = await feedbackModels.find();

    res.status(200).json({
      message: "Feedback fetched successfully",
      feedback,
    });

  } catch (error) {
    res.status(500).json({
      message: "Feedback not found",
      error: error.message,
    });
  }
});

module.exports = router;