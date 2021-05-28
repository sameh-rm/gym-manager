const {
  getAllSubscriptions,
  createSubscription,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
  getExpIncsBySubscriptionId,
  getAllExpiredSubscriptions,
  getAllUnpaidSubscriptions,
  getAllSubscriptionsInDataRange,
  getAllDailySubsInDataRange,
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

router.get("/expired", loginRequired, getAllExpiredSubscriptions);
router.get("/unpaid", loginRequired, getAllUnpaidSubscriptions);
router.get("/subs-range", loginRequired, getAllSubscriptionsInDataRange);
router.get("/dailysubs-range", loginRequired, getAllDailySubsInDataRange);

router
  .route("/:id")
  .get(loginRequired, getSubscriptionById)
  .put(loginRequired, updateSubscription)
  .delete(loginRequired, deleteSubscription);
router.route("/:id/expenses").get(loginRequired, getExpIncsBySubscriptionId);

module.exports = router;
