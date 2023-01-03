const mongoose = require("mongoose");

const likeSchema = mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Like", likeSchema);
