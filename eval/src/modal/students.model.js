const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    roll_number: { type: Number, required: true },
    user: { type: String, required: true },
    batch: { type: String, required: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("students", StudentSchema);
