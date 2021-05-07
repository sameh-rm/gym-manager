const User = require("../models/user.model.js");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generatToken.js");
// @desc    Create New User
// @route   POST /api/users
// @access  private/admin
const createUser = asyncHandler(async (req, res) => {
  const {
    name,
    username,
    password,
    image,
    permissions,
    permissionGroups,
  } = req.body;
  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400);
    throw new Error("username already exists");
  }
  if (permissionGroups) {
    permissionGroups.forEach((group) => {
      group.permissions.forEach(
        (g_perm) =>
          permissions.find(
            (perm) =>
              perm.model === g_perm.model && perm.action === g_perm.action
          ) ?? permissions.push(g_perm)
      );
    });
  }
  const user = await User.create({
    name,
    username,
    password,
    image,
    permissions,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc    Get Users List
// @route   GET /api/users
// @access  private/admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (user && (await user.matchPassword(password))) {
    res.status(200).send({
      _id: user._id,
      name: user.name,
      username: user.username,
      image: user.image,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    console.log(user);
    throw new Error("wrong username or password");
  }
});
module.exports = { createUser, getAllUsers, login };
