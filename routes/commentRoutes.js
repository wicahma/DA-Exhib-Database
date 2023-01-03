const express = require("express");
const router = express.Router();

const {
  getComments,
  addComments,
  updateComments,
  deleteComments,
} = require("../controllers/commentController");

const { protect } = require("../middleware/authMiddleware");

router.route("/:id").get(protect, getComments).post(protect, addComments);
router.route("/:id").put(protect, updateComments);
router.route("/:artId/:commentId").delete(protect, deleteComments);

module.exports = router;
