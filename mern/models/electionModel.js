const mongoose = require("mongoose");

const electionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    candidates: [
      {
        name: { type: String, required: true },
        gender: { type: String, required: true },
        description: { type: String, required: true },
        votes: { type: Number, required: true, default: 0 },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
      },
    ],
    voters: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
      },
    ],
    isFinished: {
      type: Boolean,
      required: true,
      default: false,
    },
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Election", electionSchema);
