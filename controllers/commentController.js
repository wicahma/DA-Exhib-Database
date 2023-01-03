const asyncHandler = require("express-async-handler");

const Art = require("../Models/artModels");
const User = require("../Models/userModels");
const Comment = require("../Models/commentModels");

// @desc Get Comments
// @route GET /api/comments/:id
// @access Private
const getComments = asyncHandler(async (req, res) => {
  const art = await Art.findById(req.params.id);
  const comment = await Comment.find({ artID: req.params.id })
    .populate({
      path: "userID",
      select: "username",
    })
    .sort({ createdAt: -1 });

  // Check for arts
  if (!art) {
    res.status(401);
    throw new Error("Art not found");
  }

  res.status(200).json(comment);
});

// @desc Add Comments
// @route POST /api/comments/:id
// @access Private
const addComments = asyncHandler(async (req, res) => {
  if (!req.body.comment) {
    res.status(400);
    throw new Error("Please input some comments!");
  }

  const comments = await Comment.create({
    userID: req.user.id,
    artID: req.params.id,
    comment: req.body.comment,
  });

  res.status(200).json(comments);
});

// @desc Update Comments
// @route PUT /api/comment/:id
// @access Private
const updateComments = asyncHandler(async (req, res) => {
  const art = await Art.findById(req.params.id);
  const user = await User.findById(req.user.id);
  const comment = await Comment.find({ artID: req.params.id, userID: user });

  if (!art) {
    res.status(400);
    throw new Error("Arts not Found!");
  }

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the creator matches the art
  if (comment[0].userID.toString() !== user.id) {
    res.status(401);
    throw new Error("User not Authorized!");
  }

  const updatedComments = await Comment.findByIdAndUpdate(
    comment.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedComments);
});

// @desc Delete User
// @route DELETE /api/users/:id
// @access Private
const deleteComments = asyncHandler(async (req, res) => {
  const art = await Art.findById(req.params.artId);
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

  await Comment.findOneAndDelete({
    _id: req.params.commentId,
    artID: req.params.artId,
    userID: user,
  });

  res.status(200).json("Succesfully Deleted Data");
});

module.exports = {
  getComments,
  addComments,
  updateComments,
  deleteComments,
};
