const express = require("express");
const router = express.Router();

const {
  getArts,
  addArt,
  updateArt,
  deleteArt,
  getAllArts,
  getArtByUser,
  uploadToDatabase,
} = require("../controllers/artController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getArts).post(protect, addArt);
router.route("/user/:id").get(getArtByUser);
router.route("/all").get(getAllArts);
router.route("/upload-file").post(protect, uploadToDatabase);
router.route("/:id").put(protect, updateArt).delete(protect, deleteArt);

module.exports = router;
