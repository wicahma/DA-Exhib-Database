const express = require("express");
const router = express.Router();

const {
  getLikes,
  addLikes,
  deleteLikes,
} = require("../controllers/likeController");

const { protect } = require("../middleware/authMiddleware");

router.route("/:id").get(protect, getLikes).post(protect, addLikes);
router.route("/:id").delete(protect, deleteLikes);

module.exports = router;
