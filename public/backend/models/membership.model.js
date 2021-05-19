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
        name: {
          type: String,
          required: true,
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
        period: {
          type: Number,
          required: true,
          default: 1,
        },
        plan: {
          type: String,
          required: true,
          default: "شهرى",
        },
      },
    ],
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

const Membership = mongoose.model("Membership", membershipSchema);

module.exports = Membership;
