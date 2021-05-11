const expressAsyncHandler = require("express-async-handler");
const Member = require("../models/member.model.js");
const { paginateResults } = require("../middlewares/pagination.Middlewares.js");
const createMember = expressAsyncHandler(async (req, res) => {
  // body
  const {
    name,
    image,
    age,
    tall,
    weight,
    phone,
    nationalID,
    memberShips,
    courses,
  } = req.body;
  const createdMember = Member.create({
    name,
    image,
    age,
    tall,
    weight,
    phone,
    nationalID,
    memberShips,
    courses,
  });
});

const getAllMembers = expressAsyncHandler(async (req, res) => {
  const members = await Member.find({}).limit(req.limit).skip(req.startIndex);
  // const result = paginateResults(req, Member, { results: members });

  res.status(200);
  res.json({ results: members });
});
module.exports = { createMember, getAllMembers };
