const express = require("express");
const {
  getAllUsers,
  createUser,
  login,
} = require("../controllers/user.controller.js");

const router = express.Router();
router.route("/").get(getAllUsers).post(createUser);
router.post("/login", login);

module.exports = router;
