const mongoose = require("mongoose");

const memberShipSchema = mongoose.Schema(
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
    },
  },
  {
    timestamps: true,
  }
);

const MemberShip = mongoose.model("MemberShip", memberShipSchema);

module.exports = MemberShip;
