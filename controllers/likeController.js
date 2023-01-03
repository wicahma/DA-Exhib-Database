const asyncHandler = require("express-async-handler");

const Art = require("../Models/artModels");
const User = require("../Models/userModels");
const Like = require("../Models/likeModels");

// @desc Get Likes
// @route GET /api/likes/:id
// @access Private
const getLikes = asyncHandler(async (req, res) => {
  const art = await Art.findById(req.params.id);
  const like = await Like.find({ artID: req.params.id });

  // Check for arts
  if (!art) {
    res.status(401);
    throw new Error("Art not found");
  }

  res.status(200).json({ likes: like.length });
});

// @desc Add Likes
// @route POST /api/likes/:id
// @access Private
const addLikes = asyncHandler(async (req, res) => {
  if (!req.body.like) {
    res.status(400);
    throw new Error("Please input some likes!");
  }

  const likes = await Like.create({
    userID: req.user.id,
    artID: req.params.id,
  });

  res.status(200).json(likes);
});

// @desc Delete User
// @route DELETE /api/users/:id
// @access Private
const deleteLikes = asyncHandler(async (req, res) => {
  const art = await Art.findById(req.params.id);
  const user = await User.findById(req.user.id);

  if (!art) {
    res.status(400);
    throw new Error("Arts not Found!");
  }

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  await Like.findOneAndDelete({
    artID: req.params.id,
    userID: user,
  });

  res.status(200).json("Succesfully Deleted Data");
});

module.exports = {
  getLikes,
  addLikes,
  deleteLikes,
};
