const {
  getAllMemberships,
  createMembership,
  getMembershipById,
  updateMembership,
  deleteMembership,
} = require("../controllers/membership.controller.js");
const {
  loginRequired,
  adminRequired,
} = require("../middlewares/authMiddlewares.js");
const express = require("express");

const router = express.Router();
router
  .route("/")
  .get(loginRequired, getAllMemberships)
  .post(loginRequired, adminRequired, createMembership);

router
  .route("/:id")
  .get(loginRequired, adminRequired, getMembershipById)
  .put(loginRequired, adminRequired, updateMembership)
  .delete(loginRequired, adminRequired, deleteMembership);

module.exports = router;
