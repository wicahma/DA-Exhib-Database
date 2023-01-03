const express = require("express");
const router = express.Router();
const {
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
  getMe,
  getNameUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.get("/me", protect, getMe);
router.get("/name/:id", getNameUser);
router.route("/:id").put(updateUser).delete(deleteUser);
router.route("/login").post(loginUser);
router.route("/register").post(registerUser);

module.exports = router;
