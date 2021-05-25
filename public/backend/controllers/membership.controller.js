const e = require("express");
const expressAsyncHandler = require("express-async-handler");
const Membership = require("../models/membership.model.js");

const getAllMemberships = expressAsyncHandler(async (req, res) => {
  const memberships = await Membership.find({})
    .limit(req.limit)
    .skip(req.startIndex);

  res.status(200);
  res.json({ results: memberships });
});

const createMembership = expressAsyncHandler(async (req, res) => {
  const membership = req.body;
  const membershipExists = await Membership.findOne({ name: membership.name });

  if (membershipExists) {
    res.status(400);
    throw new Error("another membership with the same name exists");
  } else {
    const createdMembership = await Membership.create({
      ...membership,
      user: req.user,
    });

    if (createdMembership) {
      res.status(201).json({
        _id: createdMembership._id,
        user: createdMembership.user,
        name: createdMembership.name,
        description: createdMembership.description,
        price: createdMembership.price,
        period: createdMembership.period,
        courses: createdMembership.courses,
        plan: createdMembership.plan,
        isActive: createdMembership.isActive,
        createdAt: createdMembership.createdAt,
        updatedAt: createdMembership.updatedAt,
      });
    }
  }
});

const getMembershipById = expressAsyncHandler(async (req, res) => {
  const membership = await Membership.findById(req.params.id);
  if (membership) {
    res.status(200);
    res.json({
      _id: membership._id,
      user: membership.user,
      name: membership.name,
      description: membership.description,
      price: membership.price,
      coruses: membership.coruses,
      period: membership.period,
      isActive: membership.isActive,
      courses: membership.courses,
      plan: membership.plan,
      createdAt: membership.createdAt,
      updatedAt: membership.updatedAt,
    });
  } else {
    res.status(404);
    throw new Error("Membership is Not Found!");
  }
});

const updateMembership = expressAsyncHandler(async (req, res) => {
  const membershipId = req.params.id;
  const { name, description, price, period, isActive, courses, plan } =
    req.body;
  const membership = await Membership.findById(membershipId);
  if (membership) {
    membership.name = name || membership.name;
    membership.description = description || membership.description;
    membership.price = price || membership.price;
    membership.period = period || membership.period;
    membership.plan = plan || membership.plan;
    membership.isActive = isActive;
    membership.user = req.user || membership.user;
    membership.courses = courses;
  } else {
    res.status(404);
  }
  const updatedMembership = await membership.save();
  if (!updatedMembership) {
    res.status(400);
    throw new Error("invalid request body");
  } else {
    if (updatedMembership) {
      res.status(202).json({
        _id: updatedMembership._id,
        user: updatedMembership.user,
        name: updatedMembership.name,
        description: updatedMembership.description,
        price: updatedMembership.price,
        period: updatedMembership.period,
        plan: updatedMembership.plan,
        courses: updatedMembership.courses,
        isActive: updatedMembership.isActive,
        createdAt: updatedMembership.createdAt,
        updatedAt: updatedMembership.updatedAt,
      });
    }
  }
});
const deleteMembership = expressAsyncHandler(async (req, res) => {
  const membership = await Membership.findById(req.params.id);
  if (membership) {
    await membership.remove();
    res.status(200).json({ message: "Deleted Successfully!" });
  } else {
    res.status(404);
    throw new Error("Not Found");
  }
});

module.exports = {
  getAllMemberships,
  createMembership,
  getMembershipById,
  updateMembership,
  deleteMembership,
};
