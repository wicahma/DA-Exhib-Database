const mongoose = require("mongoose");

const artSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add Art Name"],
    },
    desc: {
      type: String,
      required: [true, "Please provide an Art Description"],
    },
    imageUrl: {
      type: String,
      required: true,
    },
    creatorID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Art", artSchema);
