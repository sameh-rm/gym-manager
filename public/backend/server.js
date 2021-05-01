const express = require("express");
const asyncHandler = require("express-async-handler");
const connectDB = require("./config/db");
const Member = require("./models/member.model");

connectDB();
const app = express();
app.get(
  "/api/members",
  asyncHandler(async (req, res) => {
    console.log("/api/members Called");

    await Member({
      user: "608d9317b1a4bd0b7d4fe128",
      name: "Sameh2",
      nationalId: "1231asda",
      age: 15,
      tall: 144,
      weight: 123,
      image: "1231asda",
      balance: 100,
      personalAddress: {
        address: "12312Egypt",
      },
    }).save();
    const members = await Member.find({});
    console.log(members);
    res.send(members);
  })
);
app.listen(5000, () => console.log("server is running on port 5000"));
