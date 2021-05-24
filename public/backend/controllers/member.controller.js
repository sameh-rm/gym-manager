const expressAsyncHandler = require("express-async-handler");
const Member = require("../models/member.model.js");
const { paginateResults } = require("../middlewares/pagination.Middlewares.js");
const ExpInc = require("../models/expInc.model.js");
const Subscription = require("../models/subscription.model.js");
const { db } = require("../models/subscription.model.js");

const getSubscriptionsByMemberId = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const subs = await Subscription.find({ member: id })
    .sort("-createdAt")
    .limit(req.limit)
    .skip(req.startIndex);
  res.status(200);
  res.json({ results: subs });
});

const getAllMembers = expressAsyncHandler(async (req, res) => {
  const members = await Member.find({}).limit(req.limit).skip(req.startIndex);

  res.status(200);
  res.json({ results: members });
});

const subscribed = async (member, paidValue) => {
  var paid = paidValue;
  await member.subscriptions.forEach(async (sub) => {
    // delete sub._id;
    if (paid > 0) {
      if (paid >= sub.price && sub.price !== sub.paid) {
        sub.paid = sub.price;
        paid -= sub.price;
        sub.paymentStatus = true;
      } else {
        sub.paid = paid;
        paid = 0;
        sub.paymentStatus = false;
      }
      await saveMemberPayment(member, member.user, sub);
    } else {
      sub.paymentStatus = false;
    }
  });

  return member;
};
const saveMemberPayment = async (member, user, sub) => {
  if (sub.paid <= 0) return null;
  const createdExpinc = await ExpInc.create({
    description: `تم دفع ${sub.paid} بواسطة ${member.name} من حساب الإشتراك ${sub.name}`,
    inOut: "IN",
    value: sub.paid,
    member: member._id,
    user: member.user,
    subscription: sub,
    confirmed: user.isAdmin,
  });
  return createdExpinc;
};

const createMember = expressAsyncHandler(async (req, res) => {
  const member = req.body;
  const memberExists = await Member.findOne({ nationalId: member.nationalId });
  if (memberExists) {
    res.status(400);
    throw new Error("another member with the same National ID Exists");
  } else {
    const paidValue = member.paid;
    const session = await db.startSession();
    await session.withTransaction(async () => {
      const createdMember = await Member.create({
        ...member,
        user: req.user,
      });
      const subscribedMember = await subscribed(
        { _id: createdMember._id, user: req.user, ...member },
        paidValue
      );
      const createdSubs = await Subscription.insertMany(
        subscribedMember.subscriptions.map((sub) => {
          delete sub._id;
          return {
            ...sub,
            user: req.user,
            member: createdMember,
          };
        })
      );
      if (createdMember) {
        res.status(201).json({
          _id: createdMember._id,
          user: createdMember.user,
          name: createdMember.name,
          image: createdMember.image,
          age: createdMember.age,
          tall: createdMember.tall,
          weight: createdMember.weight,
          phone: createdMember.phone,
          personalAddress: createdMember.personalAddress,
          nationalId: createdMember.nationalId,
          subscriptions: createdMember.subscriptions,
          updatedAt: createdMember.updatedAt,
          createdAt: createdMember.createdAt,
        });
      }
    });
    session.endSession();
  }
});

const getMemberById = expressAsyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.id);
  if (member) {
    res.status(200);
    res.json({
      _id: member._id,
      user: member.user,
      name: member.name,
      image: member.image,
      age: member.age,
      tall: member.tall,
      weight: member.weight,
      phone: member.phone,
      nationalId: member.nationalId,
      subscriptions: member.subscriptions,
      personalAddress: member.personalAddress,
      members: member.members,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt,
    });
  } else {
    res.status(404);
    throw new Error("Member is Not Found!");
  }
});

const updateMember = expressAsyncHandler(async (req, res) => {
  const memberId = req.params.id;

  const {
    name,
    image,
    age,
    tall,
    weight,
    phone,
    nationalId,
    isActive,
    personalAddress,
  } = req.body;

  const member = await Member.findById(memberId);
  if (member) {
    member.name = name || member.name;
    member.image = image || member.image;
    member.age = age || member.age;
    member.tall = tall || member.tall;
    member.weight = weight || member.weight;
    member.phone = phone || member.phone;
    member.nationalId = nationalId || member.nationalId;
    member.personalAddress = personalAddress || member.personalAddress;
    member.isActive = isActive;
    member.user = req.user || member.user;
  } else {
    res.status(404);
  }
  delete member.__id;
  const updatedMember = await Member.updateOne({ _id: memberId }, member);
  if (!updatedMember) {
    res.status(400);
    throw new Error("invalid request body");
  } else {
    if (updatedMember) {
      res.status(202).json({
        _id: updatedMember._id,
        user: updatedMember.user,
        name: updatedMember.name,
        image: updatedMember.image,
        age: updatedMember.age,
        tall: updatedMember.tall,
        weight: updatedMember.weight,
        phone: updatedMember.phone,
        nationalID: updatedMember.nationalID,
        memberships: updatedMember.memberships,
        personalAddress: member.personalAddress,
        courses: member.courses,
        createdAt: updatedMember.createdAt,
        updatedAt: updatedMember.updatedAt,
      });
    }
  }
});
const deleteMember = expressAsyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.id);
  if (member) {
    await member.remove();
    res.status(200).json({ message: "Deleted Successfully" });
  } else {
    res.status(404);
    throw new Error("Not Found");
  }
});

module.exports = {
  getAllMembers,
  createMember,
  getMemberById,
  updateMember,
  deleteMember,
  getSubscriptionsByMemberId,
};
