const mongoose = require("mongoose");

const memberSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
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
    subscriptions: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Membership",
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
        period: {
          type: Number,
          required: true,
        },
        // plan: {
        //   type: String,
        //   required: true,
        //   //"month" || "day",
        // },
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
        confirmed: {
          type: Boolean,
          required: true,
          default: false,
        },
        paymentStatus: {
          // paid, notPaid,
          type: Boolean,
          required: true,
          default: false,
        },
      },
    ],
  },

  {
    timestamps: true,
  }
);

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
