const User = require("../models/user.model.js");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generatToken.js");
const { paginateResults } = require("../middlewares/pagination.Middlewares.js");
// @desc    Create New User
// @route   POST /api/users
// @access  private/admin
const createUser = asyncHandler(async (req, res) => {
  const {
    name,
    username,
    password,
    image,
    isAdmin = false,
    permissions = [],
    permissionGroups = [{ permissions: [] }],
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
    isAdmin,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      isAdmin: user.isAdmin,
      image: user.image,
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
  const users = await User.find({}).limit(req.limit).skip(req.startIndex);
  // const result = paginateResults(req, User, { results: users });

  res.status(200);
  res.json({ results: users });
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
    throw new Error("wrong username or password");
  }
});

/**
  @desc    Update a User byAdmin
  @route   GET /api/users
  @access  private/admin
 */
const updateUser = asyncHandler(async (req, res) => {
  // spread req.body
  const {
    name,
    username,
    password,
    image,
    isAdmin,
    permissions = [],
    permissionGroups = [{ permissions: [] }],
  } = req.body;

  const loggedUser = req.user;
  const user = await User.findById(req.params.id);
  const existed = await User.findOne({ username: username });
  if (user) {
    if (existed && existed.username !== user.username) {
      res.status(400);

      throw new Error("Username is used!");
    }
    user.name = name || user.name;
    user.username = username || user.username;
    user.password = password || user.password;
    user.image = image || user.image;
    user.isAdmin = isAdmin;
    user.user = loggedUser;
    // user.permissions = permissions;
    // user.permissionGroups = permissionGroups;
  } else {
    res.status(404);
    throw new Error("User is not found!");
  }

  const updatedUser = await user.save();
  if (updatedUser) {
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      username: updatedUser.username,
      image: updatedUser.image,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.status(200).json({ message: "deleted Successfully" });
  } else {
    res.status(404);
    throw new Error("Not Found!");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("Not Found!");
  }
});
module.exports = {
  createUser,
  getAllUsers,
  login,
  updateUser,
  deleteUser,
  getUserById,
};
