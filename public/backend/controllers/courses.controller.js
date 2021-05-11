const e = require("express");
const expressAsyncHandler = require("express-async-handler");
const Course = require("../models/course.model.js");

const getAllCourses = expressAsyncHandler(async (req, res) => {
  const courses = await Course.find({}).limit(req.limit).skip(req.startIndex);

  res.status(200);
  res.json({ results: courses });
});

const createCourse = expressAsyncHandler(async (req, res) => {
  const course = req.body;
  const courseExists = await Course.findOne({ name: course.name });
  if (courseExists) {
    res.status(400);
    throw new Error("another course with the same name exists");
  } else {
    const createdCourse = await Course.create({ ...course, user: req.user });
    if (createdCourse) {
      res.status(201).json({
        _id: createdCourse._id,
        user: createdCourse.user,
        name: createdCourse.name,
        description: createdCourse.description,
        dailyPrice: createdCourse.dailyPrice,
        monthlyPrice: createdCourse.monthlyPrice,
        daysPerMonth: createdCourse.daysPerMonth,
        minutesPerTime: createdCourse.minutesPerTime,
        period: createdCourse.period,
        isActive: createdCourse.isActive,
        createdAt: createdCourse.createdAt,
        updatedAt: createdCourse.updatedAt,
      });
    }
  }
});

const getCourseById = expressAsyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (course) {
    res.status(200);
    res.json({
      _id: course._id,
      user: course.user,
      name: course.name,
      description: course.description,
      dailyPrice: course.dailyPrice,
      monthlyPrice: course.monthlyPrice,
      daysPerMonth: course.daysPerMonth,
      minutesPerTime: course.minutesPerTime,
      period: course.period,
      isActive: course.isActive,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
    });
  } else {
    res.status(404);
    throw new Error("Course is Not Found!");
  }
});

const updateCourse = expressAsyncHandler(async (req, res) => {
  const courseId = req.params.id;
  const {
    name,
    description,
    dailyPrice,
    monthlyPrice,
    daysPerMonth,
    minutesPerTime,
    period,
    isActive,
  } = req.body;
  const course = await Course.findById(courseId);
  if (course) {
    course.name = name || course.name;
    course.description = description || course.description;
    course.dailyPrice = dailyPrice || course.dailyPrice;
    course.monthlyPrice = monthlyPrice || course.monthlyPrice;
    course.daysPerMonth = daysPerMonth || course.daysPerMonth;
    course.minutesPerTime = minutesPerTime || course.minutesPerTime;
    course.period = period || course.period;
    course.isActive = isActive;
    course.user = req.user || course.user;
  } else {
    res.status(404);
  }

  const updatedCourse = await course.save();
  if (!updatedCourse) {
    res.status(400);
    throw new Error("invalid request body");
  } else {
    if (updatedCourse) {
      res.status(202).json({
        _id: updatedCourse._id,
        user: updatedCourse.user,
        name: updatedCourse.name,
        description: updatedCourse.description,
        dailyPrice: updatedCourse.dailyPrice,
        monthlyPrice: updatedCourse.monthlyPrice,
        daysPerMonth: updatedCourse.daysPerMonth,
        minutesPerTime: updatedCourse.minutesPerTime,
        period: updatedCourse.period,
        isActive: updatedCourse.isActive,
        createdAt: updatedCourse.createdAt,
        updatedAt: updatedCourse.updatedAt,
      });
    }
  }
});
const deleteCourse = expressAsyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (course) {
    await course.remove();
    res.status(200).res.json({ message: "Deleted Successfully!" });
  } else {
    res.status(404);
    throw new Error("Not Found");
  }
});

module.exports = {
  getAllCourses,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
};
