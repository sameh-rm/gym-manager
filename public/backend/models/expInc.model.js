const mongoose = require("mongoose");

const expIncSchema = mongoose.Schema(
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
    inOut: {
      // Income / Expenses
      type: String,
      required: true,
    },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamp: true }
);

const ExpInc = mongoose.model("ExpInc", expIncSchema);

module.exports = ExpInc;
