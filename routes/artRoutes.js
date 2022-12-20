const express = require("express");
const router = express.Router();

const {
  getArts,
  addArt,
  updateArt,
  deleteArt,
} = require("../controllers/artController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getArts).post(protect, addArt);
router.route("/:id").put(protect, updateArt).delete(protect, deleteArt);

module.exports = router;
