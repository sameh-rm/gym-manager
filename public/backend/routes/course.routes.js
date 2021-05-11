const {
  getAllCourses,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses.controller.js");
const {
  loginRequired,
  adminRequired,
} = require("../middlewares/authMiddlewares.js");
const express = require("express");

const router = express.Router();
router
  .route("/:id")
  .get(loginRequired, adminRequired, getCourseById)
  .delete(loginRequired, adminRequired, deleteCourse);

router
  .route("/")
  .get(loginRequired, getAllCourses)
  .post(loginRequired, adminRequired, createCourse)
  .put(loginRequired, adminRequired, updateCourse);

module.exports = router;
