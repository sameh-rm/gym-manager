const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const loginRequired = expressAsyncHandler(async (req, res, next) => {
  let token = req.headers.authorization ? req.headers.authorization : "";
  if (token.startsWith("Bearer")) {
    try {
      token = token.split(" ")[1];
      const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(verifiedToken.id).select("-password");
      next();
    } catch (error) {
      console.error(error);

      res.status(401);
      throw new Error("Invalid Token!");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, No Token!");
  }
});

const adminRequired = expressAsyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
});

module.exports = { adminRequired, loginRequired };
