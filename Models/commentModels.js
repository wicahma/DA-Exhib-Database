const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    artID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Art",
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
