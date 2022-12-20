const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add Username"],
    },
    email: {
      type: String,
      required: [true, "Please insert a valid email address"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    avatar: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
