const asyncHandler = require("express-async-handler");

const Art = require("../Models/artModels");
const User = require("../Models/userModels");
const { uploadToGoogleDrive, authenticateGoogle } = require("../services/googleDriveServices");

// @desc Get Arts
// @route GET /api/arts
// @access Public
const getArts = asyncHandler(async (req, res) => {
  const art = await Art.find({ creatorID: req.user.id });

  res.status(200).json(art);
});

// @desc Get Arts
// @route GET /api/arts
// @access Public
const getAllArts = asyncHandler(async (req, res) => {
  const art = await Art.find({});
  res.status(200).json(art);
});

// @desc Get Arts
// @route GET /api/arts/user/:id
// @access Public
const getArtByUser = asyncHandler(async (req, res) => {
  const art = await Art.find({ creatorID: req.params.id });
  res.status(200).json(art);
});

// @desc Add User
// @route POST /api/arts
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
// @route PUT /api/arts/:id
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
// @route DELETE /api/arts/:id
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

const uploadToDatabase = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  try {
    if (!req.file) {
      res.status(400).send("No file uploaded.");
      return;
    }
    const auth = authenticateGoogle();
    const response = await uploadToGoogleDrive(req.file, auth);
    deleteFile(req.file.path);
    res.status(200).json({ response });
  } catch (err) {
    console.log(err);
  }
});

module.exports = {
  getArts,
  addArt,
  updateArt,
  deleteArt,
  getAllArts,
  getArtByUser,
  uploadToDatabase,
};
