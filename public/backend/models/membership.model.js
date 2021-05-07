const mongoose = require("mongoose");

const membershipSchema = mongoose.Schema(
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
    period: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0.0,
    },
    courses: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
        course: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Course",
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
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Membership = mongoose.model("Membership", membershipSchema);

module.exports = Membership;
