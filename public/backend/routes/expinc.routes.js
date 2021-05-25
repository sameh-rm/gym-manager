const {
  getAllExpIncs,
  createExpInc,
  getExpIncById,
  updateExpInc,
  deleteExpInc,
} = require("../controllers/expinc.controller.js");

const {
  loginRequired,
  adminRequired,
} = require("../middlewares/authMiddlewares.js");

const express = require("express");

const router = express.Router();

router
  .route("/")
  .get(loginRequired, getAllExpIncs)
  .post(loginRequired, adminRequired, createExpInc);

router
  .route("/:id")
  .get(loginRequired, adminRequired, getExpIncById)
  .put(loginRequired, adminRequired, updateExpInc)
  .delete(loginRequired, adminRequired, deleteExpInc);

module.exports = router;
