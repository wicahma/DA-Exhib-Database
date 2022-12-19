const asyncHandler = require("express-async-handler");

// @desc Get Users
// @route GET /api/users
// @access Public
const getUsers = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get Users" });
});

// @desc Add User
// @route POST /api/users
// @access Public
const addUser = asyncHandler(async (req, res) => {
  if (!req.body.username) {
    res.status(400);
    throw new Error("Please input a username!");
  }

  res.status(200).json({ message: "Add Users" });
});

// @desc Update User
// @route PUT /api/users/:id
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update Users ${req.params.id}` });
});

// @desc Delete User
// @route DELETE /api/users/:id
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `User Deleted ${req.params.id}` });
});

module.exports = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};
