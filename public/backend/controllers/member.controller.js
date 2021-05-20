const expressAsyncHandler = require("express-async-handler");
const Member = require("../models/member.model.js");
const { paginateResults } = require("../middlewares/pagination.Middlewares.js");
const ExpInc = require("../models/expInc.model.js");

const getAllMembers = expressAsyncHandler(async (req, res) => {
  const members = await Member.find({}).limit(req.limit).skip(req.startIndex);

  res.status(200);
  res.json({ results: members });
});

const subscribed = (member) => {
  var paid = member.paid;
  member.subscriptions.forEach((sub) => {
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
    } else {
      sub.paymentStatus = false;
    }
  });

  // if (paid > 0) {
  //   if (
  //     paid >= member.memberships[0].price &&
  //     member.memberships[0].price !== member.memberships[0].paid
  //   ) {
  //     member.memberships[0].paid = member.memberships[0].price;
  //     paid -= member.memberships[0].price;
  //   } else {
  //     member.memberships[0].paid = paid;
  //     paid = 0;
  //   }
  //   member.courses.forEach((course) => {
  //     if (!course.membership && course.paid === 0 && paid > 0) {
  //       if (course.paid <= paid) {
  //         course.paid = paid;
  //       } else {
  //         course.paid = course.price;
  //       }
  //     }
  //   });
  // }
  return member;
};
const saveMemberPayment = async (member, paidValue) => {
  return await ExpInc.create({
    description: `تم دفع ${paidValue}جنيه من حساب إشترك ${member.name}`,
    value: paidValue,
    ref: member._id,
    model: "Member",
    user: member.user,
  });
};

const createMember = expressAsyncHandler(async (req, res) => {
  const member = req.body;
  const memberExists = await Member.findOne({ nationalId: member.nationalId });
  if (memberExists) {
    res.status(400);
    throw new Error("another member with the same National ID Exists");
  } else {
    const paidValue = member.paid;
    const subscribedMember = subscribed(member);

    const createdMember = await Member.create({
      ...subscribedMember,
      user: req.user,
    });
    if (paidValue > 0) {
      const paiedMember = await saveMemberPayment(createdMember, paidValue);
    }
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
};
