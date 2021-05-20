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
    model: {
      type: String,
    },
    ref: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamp: true }
);

const ExpInc = mongoose.model("ExpInc", expIncSchema);

module.exports = ExpInc;
