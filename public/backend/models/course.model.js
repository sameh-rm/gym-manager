const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dailyPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    monthlyPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    daysPerMonth: {
      type: Number,
      required: true,
      default: 26,
    },
    minutesPerTime: {
      type: Number,
      required: true,
      default: 60,
    },
    period: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
