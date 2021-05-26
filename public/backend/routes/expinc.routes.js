const {
  getAllExpIncs,
  createExpInc,
  getExpIncById,
  confirmExpinc,
  deleteExpInc,
  getAllUnConfirmedExpIncs,
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

router.route("/unconfirmed").get(loginRequired, getAllUnConfirmedExpIncs);
router
  .route("/:id")
  .get(loginRequired, adminRequired, getExpIncById)
  .put(loginRequired, adminRequired, confirmExpinc)
  .delete(loginRequired, adminRequired, deleteExpInc);

module.exports = router;
