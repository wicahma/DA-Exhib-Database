const asyncHandler = require("express-async-handler");

const Art = require("../Models/artModels");
const User = require("../Models/userModels");

// @desc Get Users
// @route GET /api/users
// @access Public
const getArts = asyncHandler(async (req, res) => {
  const art = await Art.find({ creatorID: req.user.id });

  res.status(200).json(art);
});

// @desc Add User
// @route POST /api/users
// @access Public
const addArt = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please input the Art Name!");
  }

  const art = await Art.create({
    name: req.body.name,
    creatorID: req.user.id,
    desc: req.body.desc,
    imageUrl: req.body.imageUrl,
  });

  res.status(200).json(art);
});

// @desc Update User
// @route PUT /api/users/:id
// @access Private
const updateArt = asyncHandler(async (req, res) => {
  const art = await Art.findById(req.params.id);

  if (!art) {
    res.status(400);
    throw new Error("Arts not Found!");
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the creator matches the art
  if (art.creatorID.toString() !== user.id) {
    res.status(401);
    throw new Error("User not Authorized!");
  }

  const updatedArt = await Art.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedArt);
});

// @desc Delete User
// @route DELETE /api/users/:id
// @access Private
const deleteArt = asyncHandler(async (req, res) => {
  const art = await Art.findById(req.params.id);

  if (!art) {
    res.status(400);
    throw new Error("Arts not Found!");
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the creator matches the art
  if (art.creatorID.toString() !== user.id) {
    res.status(401);
    throw new Error("User not Authorized!");
  }

  await art.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getArts,
  addArt,
  updateArt,
  deleteArt,
};
