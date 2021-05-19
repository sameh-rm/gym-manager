const express = require("express");
const {
  getAllMembers,
  createMember,
  getMemberById,
  updateMember,
  deleteMember,
} = require("../controllers/member.controller.js");
const {
  loginRequired,
  adminRequired,
} = require("../middlewares/authMiddlewares.js");

const router = express.Router();

router
  .route("/")
  .get(loginRequired, adminRequired, getAllMembers)
  .post(loginRequired, adminRequired, createMember);

router
  .route("/:id")
  .get(loginRequired, adminRequired, getMemberById)
  .put(loginRequired, adminRequired, updateMember)
  .delete(loginRequired, adminRequired, deleteMember);

module.exports = router;
