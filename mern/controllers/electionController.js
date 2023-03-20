const Election = require("../models/electionModel");
const asyncHandler = require("express-async-handler");

const getElectionResult = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const candidates = await Election.findById(id, { candidates: 1 });
  if (candidates) {
    res.status(200).json({
      candidates: candidates,
    });
  } else {
    res.status(404);
    throw new Error("Elections not found");
  }
});

const getElections = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const elections = await Election.find({ ...keyword });
  res.status(200).json(elections);
  console.log(elections);
});

module.exports = {
  getElectionResult,
  getElections,
};
