const {
  getAllSubscriptions,
  createSubscription,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
  getExpIncsBySubscriptionId,
} = require("../controllers/subscriptions.controller.js");
const {
  loginRequired,
  adminRequired,
} = require("../middlewares/authMiddlewares.js");
const express = require("express");

const router = express.Router();
router
  .route("/")
  .get(loginRequired, getAllSubscriptions)
  .post(loginRequired, adminRequired, createSubscription);

router
  .route("/:id")
  .get(loginRequired, getSubscriptionById)
  .put(loginRequired, updateSubscription)
  .delete(loginRequired, deleteSubscription);
router.route("/:id/expenses").get(loginRequired, getExpIncsBySubscriptionId);

module.exports = router;
