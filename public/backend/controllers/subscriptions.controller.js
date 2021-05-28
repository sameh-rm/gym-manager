const expressAsyncHandler = require("express-async-handler");
const ExpInc = require("../models/expInc.model");
const Member = require("../models/member.model");
const Subscription = require("../models/subscription.model");
const moment = require("moment");
const { fixDate } = require("../utils/date");
const getAllSubscriptions = expressAsyncHandler(async (req, res) => {
  const subs = await Subscription.find({})
    .populate("user member course membership")
    .limit(req.limit)
    .skip(req.startIndex);

  res.status(200);
  res.json({ results: subs });
});

// returns a list of the new subscriptions added today excluding the dailysubs
const getAllSubscriptionsInDataRange = expressAsyncHandler(async (req, res) => {
  const startDate = req.query.start_date;
  const endDate = req.query.end_date;

  if ((startDate, endDate)) {
    const subs = await Subscription.find({
      type: { $ne: "DailySub" },
      createdAt: {
        $lte: new Date(endDate),
        $gte: new Date(startDate),
      },
    });
    res.status(200);
    console.log(subs);
    res.json({ results: subs, count: subs.length });
  } else {
    res.status(400);
    throw new Error("Wrong Date Format");
  }
  // .populate("user member course membership")
  // .limit(req.limit)
  // .skip(req.startIndex);
});

const getAllDailySubsInDataRange = expressAsyncHandler(async (req, res) => {
  const startDate = req.query.start_date;
  const endDate = req.query.end_date;

  if ((startDate, endDate)) {
    const subs = await Subscription.find({
      type: { $eq: "DailySub" },
      createdAt: {
        $lte: new Date(endDate),
        $gte: new Date(startDate),
      },
    });
    res.status(200);
    console.log(subs);
    res.json({ results: subs, count: subs.length });
  } else {
    res.status(400);
    throw new Error("Wrong Date Format");
  }
  // .populate("user member course membership")
  // .limit(req.limit)
  // .skip(req.startIndex);
});

const getAllExpiredSubscriptions = expressAsyncHandler(async (req, res) => {
  const subs = await Subscription.find({
    type: { $ne: "DailySub" },
    endsAt: {
      $lte: new Date(),
    },
  })
    .populate("user member course membership")
    .limit(req.limit)
    .skip(req.startIndex);

  res.status(200);
  res.json({ results: subs });
});
const getAllUnpaidSubscriptions = expressAsyncHandler(async (req, res) => {
  const subs = await Subscription.find({
    type: { $ne: "DailySub" },
    paymentStatus: false,
  })
    .populate("user member course membership")
    .limit(req.limit)
    .skip(req.startIndex);

  res.status(200);
  res.json({ results: subs });
});
const createSubscription = expressAsyncHandler(async (req, res) => {
  const sub = req.body;
  const createdSubscription = await Subscription.create({
    ...sub,
    user: req.user,
    paymentStatus: Number(sub.paid) === Number(sub.price),
  });

  const payment = await saveMemberPayment(
    createdSubscription.paid,
    req.user,
    createdSubscription
  );

  if (createdSubscription) {
    res.status(201).json({
      _id: createdSubscription._id,
      user: createdSubscription.user,
      member: createdSubscription.member,
      type: createdSubscription.type,
      courses: createdSubscription.courses,
      name: createdSubscription.name,
      description: createdSubscription.description,
      period: createdSubscription.period,
      price: createdSubscription.price,
      paid: createdSubscription.paid,
      course: createdSubscription.course,
      membership: createdSubscription.membership,
      startedAt: createdSubscription.startedAt,
      endsAt: createdSubscription.endsAt,
      paymentStatus: createdSubscription.paymentStatus,
    });
  }
});

const getSubscriptionById = expressAsyncHandler(async (req, res) => {
  const sub = await (await Subscription.findById(req.params.id))
    .populate("user member membership course")
    .execPopulate();
  if (sub) {
    res.status(200);
    res.json({
      _id: sub._id,
      user: sub.user,
      member: sub.member,
      type: sub.type,
      courses: sub.courses,
      name: sub.name,
      description: sub.description,
      period: sub.period,
      price: sub.price,
      paid: sub.paid,
      course: sub.course,
      membership: sub.membership,
      isActive: sub.isActive,
      startedAt: sub.startedAt,
      endsAt: sub.endsAt,
      paymentStatus: sub.paymentStatus,
    });
  } else {
    res.status(404);
    throw new Error("Subscription is Not Found!");
  }
});
const getExpIncsBySubscriptionId = expressAsyncHandler(async (req, res) => {
  const expincs = await ExpInc.find({ subscription: req.params.id }).populate(
    "user"
  );

  if (expincs) {
    res.status(200);
    res.json({ results: expincs });
  } else {
    res.status(404);
    throw new Error("ExpInc is Not Found!");
  }
});

const saveMemberPayment = async (paidValue, user, sub) => {
  // const member = sub.member;
  var member = {};
  if (sub.type !== "DailySub") {
    member = await Member.findById(sub.member);
  }
  if (paidValue <= 0) return null;
  const createdPayment = await ExpInc.create({
    description: `تم دفع ${paidValue} جنيهاً بواسطة ${
      sub.type !== "DailySub" ? member.name : sub.dailyMember
    } من حساب الإشتراك ${sub.name}`,
    inOut: "IN",
    value: paidValue,
    user: user._id,
    member: sub.type !== "DailySub" ? member._id : null,
    subscription: sub._id,
    confirmed: user.isAdmin,
  }).catch((err) => console.log(err));
  return createdPayment;
};

const updateSubscription = expressAsyncHandler(async (req, res) => {
  const subId = req.params.id;
  const { paid, isActive } = req.body;
  const sub = await (await Subscription.findById(subId)).populate("member");
  if (sub) {
    sub.paid = sub.paid + paid || sub.paid;
    sub.isActive = isActive || sub.isActive;
    sub.paymentStatus = sub.paid === sub.price;
  } else {
    res.status(404);
  }

  const updatedSubscription = await sub.save();
  const payment = await saveMemberPayment(paid, req.user, updatedSubscription);
  if (!updatedSubscription) {
    res.status(400);
    throw new Error("invalid request body");
  } else {
    if (updatedSubscription) {
      res.status(202).json({
        _id: updatedSubscription._id,
        user: updatedSubscription.user,
        member: updatedSubscription.member,
        type: updatedSubscription.type,
        courses: updatedSubscription.courses,
        name: updatedSubscription.name,
        description: updatedSubscription.description,
        period: updatedSubscription.period,
        price: updatedSubscription.price,
        paid: updatedSubscription.paid,
        isActive: updatedSubscription.isActive,
        course: updatedSubscription.course,
        membership: updatedSubscription.membership,
        startedAt: updatedSubscription.startedAt,
        endsAt: updatedSubscription.endsAt,
        paymentStatus: updatedSubscription.paymentStatus,
      });
    }
  }
});

const deleteSubscription = expressAsyncHandler(async (req, res) => {
  const sub = await Subscription.findById(req.params.id);
  const expincs = await ExpInc.find({ subscription: sub._id });
  expincs.forEach(
    async (expinc) => expinc.confirmed ?? (await expinc.remove())
  );
  if (sub) {
    await expincs.forEach(async (e) => {
      await e.remove();
    });
    await sub.remove();
    res.status(200).json({ message: "Deleted Successfully!" });
  } else {
    res.status(404);
    throw new Error("Not Found");
  }
});

module.exports = {
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
};
