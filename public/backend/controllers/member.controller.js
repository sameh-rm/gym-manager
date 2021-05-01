const Member = require("../models/member.model.js");

const createMember = async (member) => {
  if (member && member.name) {
    const createdMember = await Member(member).save();
    return createdMember;
  }
};

const getAllMembers = async () => {
  const members = await Member.find({});
  console.log(members);
  return members;
};
module.exports = { createMember, getAllMembers };
