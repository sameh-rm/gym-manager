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
    gender: {
      type: String,
      default: "MALE",
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
// memberSchema.pre("save", async function (next) {
//   ExpInc.create({description:``,value:})

//   next();
// });
const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
