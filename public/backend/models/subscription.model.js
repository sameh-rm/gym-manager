const mongoose = require("mongoose");

const subscriptionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    member: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "Member",
    },
    membership: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Membership",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    type: {
      // "Memebership" || "course",
      type: String,
      required: true,
    },
    courses: [],
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dailyMember: {
      type: String,
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
    paid: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    startedAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    endsAt: {
      type: Date,
      required: true,
    },
    paymentStatus: {
      // paid, notPaid,
      type: Boolean,
      required: true,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;
