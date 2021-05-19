const mongoose = require("mongoose");

const memberSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    memberships: [
      {
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
        started_at: {
          type: Date,
          required: true,
          default: Date.now(),
        },
        ends_at: {
          type: Date,
          required: true,
        },
        confirmed: {
          type: Boolean,
          required: true,
          default: false,
        },
        payment_status: {
          // paid, notPaid,
          type: Boolean,
          required: true,
          default: true,
        },
      },
    ],
    courses: [
      {
        name: {
          type: String,
          required: true,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Membership",
        },
        period: {
          type: Number,
          required: true,
          default: 1,
        },
        plan: {
          //Daily or monthly
          type: String,
          required: true,
          default: "شهرى",
        },
        started_at: {
          type: Date,
          required: true,
          default: Date.now(),
        },
        ends_at: {
          type: Date,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          default: 0,
        },
        paid: {
          type: Number,
          required: true,
          default: 0,
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
      },
    ],
    personalAddress: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        default: "المنشية",
      },
      center: {
        type: String,
        default: "الخانكة",
      },
      governorate: {
        type: String,
        default: "قليوبية",
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
