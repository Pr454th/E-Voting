const Election = require("../models/electionModel");
const asyncHandler = require("express-async-handler");

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
  res.json(elections);
});

const getElectionById = asyncHandler(async (req, res) => {
  const election = await Election.findById(req.params.id);

  if (election) {
    res.json(election);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

module.exports = {
  getElectionById,
  getElections,
};
