const mongoose = require("mongoose");

const permissionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    action: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Permission = mongoose.model("Permission", permissionSchema);

module.exports = Permission;
