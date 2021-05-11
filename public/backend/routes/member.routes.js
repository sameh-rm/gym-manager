const express = require("express");
const { getAllMembers } = require("../controllers/member.controller.js");
const {
  loginRequired,
  adminRequired,
} = require("../middlewares/authMiddlewares.js");

const router = express.Router();

router.route("/").get(loginRequired, adminRequired, getAllMembers);

module.exports = router;
