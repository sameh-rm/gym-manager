const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    permissions: [
      {
        permission: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Permission",
        },
        allowed_by: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
        description: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
const User = mongoose.model("User", userSchema);
module.exports = User;
