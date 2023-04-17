const Election = require("../models/electionModel");
const User = require("../models/userModel");
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
    throw new Error("Election Not Found");
  }
});

const createElectionById = asyncHandler(async (req, res) => {
  const election = new Election({
    name: req.body.name,
    description: req.body.description,
  });

  const createdElection = await election.save();
  res.status(201).json(createdElection);
});

const deleteElectionById = asyncHandler(async (req, res) => {
  const election = await Election.findById(req.params.id);

  if (election) {
    await election.remove();
    res.json({ message: "Election removed" });
  } else {
    res.status(404);
    throw new Error("Election Not Found");
  }
});

const updateElectionById = asyncHandler(async (req, res) => {
  const election = await Election.findById(req.params.id);

  if (election) {
    election.name = req.body.name || election.name;
    election.description = req.body.description || election.description;
    election.isStarted = req.body.isStarted || election.isStarted;
    election.isFinished = req.body.isFinished || election.isFinished;
    election.startedAt = req.body.startedAt || election.startedAt;
    election.finishedAt = req.body.finishedAt || election.finishedAt;

    const updatedElection = await election.save();
    res.json(updatedElection);
  } else {
    res.status(404);
    throw new Error("Election Not Found");
  }
});

const addCandidate = asyncHandler(async (req, res) => {
  const election = await Election.findById(req.params.id);
  const candidateExists = await User.findOne({ email: req.body.email });
  const emailExists = await election.candidates;
  for (let i = 0; i < emailExists.length; i++) {
    if (emailExists[i].email === req.body.email) {
      res.status(400);
      throw new Error("Candidate Already Exists");
    }
  }
  for (let i = 0; i < emailExists.length; i++) {
    if (emailExists[i].address === req.body.address) {
      res.status(400);
      throw new Error("Crypto Address Already Exists");
    }
  }

  if (election) {
    if (candidateExists) {
      const candidate = {
        name: candidateExists.name,
        gender: candidateExists.gender,
        user: candidateExists._id,
        email: req.body.email,
        address: req.body.address,
      };
      election.candidates.push(candidate);
      const updatedElection = await election.save();

      res.json(updatedElection);
    } else {
      res.status(404);
      throw new Error("User Not Found");
    }
  } else {
    res.status(404);
    throw new Error("Election Not Found");
  }
});

const deleteCandidate = asyncHandler(async (req, res) => {
  const election = await Election.findById(req.params.id);

  if (election) {
    election.candidates = election.candidates.filter(
      (x) => x.address !== req.body.address
    );
    const updatedElection = await election.save();
    res.json(updatedElection);
  } else {
    res.status(404);
    throw new Error("Election Not Found");
  }
});

const addVoter = asyncHandler(async (req, res) => {
  const election = await Election.findById(req.params.id);
  election.voters = [];
  if (req.body.email === "everyone") {
    const users = await User.find({}).select([
      "_id",
      "name",
      "gender",
      "email",
    ]);
    users.map((User) => {
      const voter = {
        name: User.name,
        email: User.email,
        gender: User.gender,
        user: User._id,
      };
      election.voters.push(voter);
    });

    const updatedElection = await election.save();

    res.json(updatedElection);
  } else {
    const voterExists = await User.findOne({ email: req.body.email });
    const emailExists = await election.voters;
    for (let i = 0; i < emailExists.length; i++) {
      if (emailExists[i].email === req.body.email) {
        res.status(400);
        throw new Error("Voter Already Exists");
      }
    }

    if (election) {
      if (voterExists) {
        const voter = {
          name: voterExists.name,
          gender: voterExists.gender,
          user: voterExists._id,
          email: req.body.email,
        };
        election.voters.push(voter);

        const updatedElection = await election.save();

        res.json(updatedElection);
      } else {
        res.status(404);
        throw new Error("User Not Found");
      }
    } else {
      res.status(404);
      throw new Error("Election Not Found");
    }
  }
});

const deleteVoter = asyncHandler(async (req, res) => {
  const election = await Election.findById(req.params.id);

  if (election) {
    election.voters = election.voters.filter((x) => x.email !== req.body.email);
    const updatedElection = await election.save();
    res.json(updatedElection);
  } else {
    res.status(404);
    throw new Error("Election Not Found");
  }
});

const startElectionById = asyncHandler(async (req, res) => {
  const election = await Election.findById(req.params.id);

  if (election) {
    if (election.isStarted) {
      res.status(400);
      throw new Error("Election Already Started");
    }

    if (election.candidates.length < 2) {
      res.status(400);
      throw new Error("Election Must Have At Least 2 Candidates");
    }

    election.isStarted = true;
    election.startedAt = Date.now();
    const updatedElection = await election.save();
    res.json(updatedElection);
  } else {
    res.status(404);
    throw new Error("Election Not Found");
  }
});

const finishElectionById = asyncHandler(async (req, res) => {
  const election = await Election.findById(req.params.id);

  if (election) {
    if (election.isFinished) {
      res.status(400);
      throw new Error("Election Already Finished");
    }

    if (!election.isStarted) {
      res.status(400);
      throw new Error("Election Not Started Yet");
    }

    election.isFinished = true;
    election.finishedAt = Date.now();
    const updatedElection = await election.save();
    res.json(updatedElection);
  } else {
    res.status(404);
    throw new Error("Election Not Found");
  }
});

module.exports = {
  getElectionById,
  getElections,
  createElectionById,
  deleteElectionById,
  updateElectionById,
  addCandidate,
  deleteCandidate,
  addVoter,
  deleteVoter,
  startElectionById,
  finishElectionById,
};
