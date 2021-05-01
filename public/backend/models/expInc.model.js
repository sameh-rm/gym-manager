const mongoose = require("mongoose");

const expIncSchema = mongoose.Schema(
  {
    description: { type: String, required: true },
    value: {
      type: Number,
      required: true,
      default: 0.0,
    },
  },
  { timestamp: true }
);

const ExpInc = mongoose.model("ExpInc", expIncSchema);

module.exports = ExpInc;
