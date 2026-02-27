const express = require("express");
const Course = require("../models/Course");

const router = express.Router();

// POST /api/courses
router.post("/", async (req, res) => {
  try {
    const { courseName, courseDescription, instructor } = req.body;

    const course = new Course({
      courseName,
      courseDescription,
      instructor,
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE /api/courses/:id
router.delete("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
