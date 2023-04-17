const express = require("express");
const {
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
} = require("../controllers/electionController");
const { protect, admin } = require("../middleware/authMiddleWare");

const router = express.Router();

router
  .route("/")
  .get(protect, getElections)
  .post(protect, admin, createElectionById);

router
  .route("/:id")
  .get(protect, getElectionById)
  .delete(protect, admin, deleteElectionById)
  .put(protect, admin, updateElectionById);

router.route("/addcandidate/:id").put(protect, admin, addCandidate);

router.route("/deletecandidate/:id").put(protect, admin, deleteCandidate);

router.route("/addvoter/:id").put(protect, admin, addVoter);

router.route("/deletevoter/:id").put(protect, admin, deleteVoter);

router.route("/start/:id").put(protect, admin, startElectionById);

router.route("/finish/:id").put(protect, admin, finishElectionById);

module.exports = router;
