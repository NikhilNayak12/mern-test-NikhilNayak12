const express = require("express");
const { createCourse, getCourses, deleteCourse, searchCourses } = require("../controllers/courseController");
// GET /api/courses/search
router.get("/search", searchCourses);

const router = express.Router();

// POST /api/courses
router.post("/", createCourse);

// GET /api/courses
router.get("/", getCourses);

// DELETE /api/courses/:id
router.delete("/:id", deleteCourse);

module.exports = router;
