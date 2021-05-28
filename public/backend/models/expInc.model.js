const mongoose = require("mongoose");

const expincSchema = mongoose.Schema(
  {
    description: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    value: {
      type: Number,
      required: true,
      default: 0.0,
    },
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },
    dailySub: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
    },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
    },
    inOut: {
      // Income / Expenses
      type: String,
      required: true,
    },

    confirmed: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

const ExpInc = mongoose.model("Expinc", expincSchema);

module.exports = ExpInc;
