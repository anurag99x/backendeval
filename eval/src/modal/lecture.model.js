const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    instructor: { type: String, required: true },
    batch: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("lecture", LectureSchema);
