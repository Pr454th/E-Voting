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
        email: { type: String, required: true },
        gender: { type: String, required: true },
        address: { type: String, required: true },
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
    isStarted: {
      type: Boolean,
      required: false,
      default: false,
    },
    startedAt: {
      type: Date,
      required: false,
    },
    isFinished: {
      type: Boolean,
      required: false,
      default: false,
    },
    finishedAt: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Election", electionSchema);
