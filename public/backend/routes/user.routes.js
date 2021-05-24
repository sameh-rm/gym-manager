const express = require("express");
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
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

router
  .route("/:id")
  .get(loginRequired, getUserById)
  .put(loginRequired, adminRequired, updateUser)
  .delete(loginRequired, adminRequired, deleteUser);

router.post("/login", login);

module.exports = router;
