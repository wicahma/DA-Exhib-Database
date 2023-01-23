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
  searchArts,
} = require("../controllers/artController");

const { protect } = require("../middleware/authMiddleware");
const { multer } = require("../middleware/multerFileHandler");

router.route("/").get(protect, getArts).post(protect, addArt);
router.route("/user/:id").get(getArtByUser);
router.route("/all").get(getAllArts);
router.route("/search/:name").get(protect,searchArts);
router.route("/:id").put(protect, updateArt).delete(protect, deleteArt);
router
  .route("/upload-file")
  .post(protect, multer.single("file"), uploadToDatabase);

module.exports = router;
