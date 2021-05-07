const mongoose = require("mongoose");

const permissionGroupSchema = mongoose.Schema(
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
    description: {
      type: String,
      required: true,
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
  {
    timestamps: true,
  }
);

const PermissionGroup = mongoose.model(
  "PermissionGroup",
  permissionGroupSchema
);

module.exports = PermissionGroup;
