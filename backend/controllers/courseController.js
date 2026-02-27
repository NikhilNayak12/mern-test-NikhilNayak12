const Course = require("../models/Course");

// POST /api/courses
const createCourse = async (req, res) => {
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
};

// GET /api/courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE /api/courses/:id
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// GET /api/courses/search?query=...
const searchCourses = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Query parameter is required" });
    }
    const regex = new RegExp(query, "i");
    const courses = await Course.find({
      $or: [
        { courseName: regex },
        { courseDescription: regex },
        { instructor: regex },
      ],
    });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createCourse, getCourses, deleteCourse, searchCourses };
