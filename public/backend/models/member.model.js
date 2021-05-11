const mongoose = require("mongoose");

const memberSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    courses: [
      {
        name: {
          type: String,
          required: true,
        },
        period: {
          type: Number,
          required: true,
        },
        plan: {
          //Daily or monthly
          type: String,
          required: true,
        },
        started_at: {
          type: Date,
          required: true,
        },
        ends_at: {
          type: Date,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        confirmed: {
          type: Boolean,
          required: true,
          default: false,
        },
        status: {
          type: Boolean,
          required: true,
          default: true,
        },
        Course: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Course",
        },
      },
    ],
    personalAddress: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
        default: "المنشية",
      },
      country: {
        type: String,
        required: true,
        default: "Egypt",
      },
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

    nationalId: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    tall: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    image: {
      type: String,
    },
    balance: {
      type: Number,
      required: true,
      default: 0.0,
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

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
