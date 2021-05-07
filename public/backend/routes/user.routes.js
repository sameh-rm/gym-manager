const express = require("express");
const {
  getAllUsers,
  createUser,
  login,
} = require("../controllers/user.controller.js");
const {
  loginRequired,
  adminRequired,
} = require("../middlewares/authMiddlewares.js");

const router = express.Router();
router
  .route("/")
  .get(loginRequired, adminRequired, getAllUsers)
  .post(loginRequired, adminRequired, createUser);
router.post("/login", login);

module.exports = router;
