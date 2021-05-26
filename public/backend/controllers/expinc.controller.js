const expressAsyncHandler = require("express-async-handler");
const ExpInc = require("../models/expInc.model.js");

const getAllExpIncs = expressAsyncHandler(async (req, res) => {
  const expincs = await ExpInc.find({})
    .sort("-createdAt")
    .limit(req.limit)
    .skip(req.startIndex)
    .populate("user member subscription");
  res.status(200);
  res.json({ results: expincs });
});

const getAllUnConfirmedExpIncs = expressAsyncHandler(async (req, res) => {
  const expincs = await ExpInc.find({ confirmed: false })
    .sort("-createdAt")
    .limit(req.limit)
    .skip(req.startIndex)
    .populate("user member subscription");
  res.status(200);
  res.json({ results: expincs });
});

const createExpInc = expressAsyncHandler(async (req, res) => {
  const expinc = req.body;
  const createdExpInc = await ExpInc.create({
    ...expinc,
    user: req.user,
    confirmed: req.user.isAdmin,
  });
  if (createdExpInc) {
    res.status(201).json({
      _id: createdExpInc._id,
      user: createdExpInc.user,
      description: createdExpInc.description,
      value: createdExpInc.value,
      member: createdExpInc.member,
      subscription: createdExpInc.subscription,
      inOut: createdExpInc.inOut,
      confirmed: createdExpInc.confirmed,
      createdAt: createdExpInc.createdAt,
      updatedAt: createdExpInc.updatedAt,
    });
  }
});

const getExpIncById = expressAsyncHandler(async (req, res) => {
  const expinc = await ExpInc.findById(req.params.id).populate(
    "user member subscription"
  );
  if (expinc) {
    res.status(200);
    res.json({
      _id: expinc._id,
      user: expinc.user,
      description: expinc.description,
      value: expinc.value,
      member: expinc.member,
      subscription: expinc.subscription,
      inOut: expinc.inOut,
      confirmed: expinc.confirmed,
      createdAt: expinc.createdAt,
      updatedAt: expinc.updatedAt,
    });
  } else {
    res.status(404);
    throw new Error("ExpInc is Not Found!");
  }
});

const confirmExpinc = expressAsyncHandler(async (req, res) => {
  const expincId = req.params.id;
  const expinc = await ExpInc.findById(expincId);
  if (expinc) {
    expinc.confirmed = req.user.isAdmin;
  } else {
    res.status(404);
  }

  const updatedExpInc = await expinc.save();
  if (!updatedExpInc) {
    res.status(400);
    throw new Error("invalid request body");
  } else {
    if (updatedExpInc) {
      res.status(202).json({
        _id: updatedExpInc._id,
        user: updatedExpInc.user,
        description: updatedExpInc.description,
        value: updatedExpInc.value,
        member: updatedExpInc.member,
        subscription: updatedExpInc.subscription,
        inOut: updatedExpInc.inOut,
        confirmed: updatedExpInc.confirmed,
        createdAt: updatedExpInc.createdAt,
        updatedAt: updatedExpInc.updatedAt,
      });
    }
  }
});

const deleteExpInc = expressAsyncHandler(async (req, res) => {
  const expinc = await ExpInc.findById(req.params.id);
  if (expinc) {
    await expinc.remove();
    res.status(200).json({ message: "Deleted Successfully!" });
  } else {
    res.status(404);
    throw new Error("Not Found");
  }
});

module.exports = {
  getAllExpIncs,
  createExpInc,
  getExpIncById,
  confirmExpinc,
  deleteExpInc,
  getAllUnConfirmedExpIncs,
};
