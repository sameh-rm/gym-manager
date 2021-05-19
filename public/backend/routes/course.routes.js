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
  .route("/")
  .get(loginRequired, getAllCourses)
  .post(loginRequired, adminRequired, createCourse);

router
  .route("/:id")
  .get(loginRequired, adminRequired, getCourseById)
  .put(loginRequired, adminRequired, updateCourse)
  .delete(loginRequired, adminRequired, deleteCourse);

module.exports = router;
