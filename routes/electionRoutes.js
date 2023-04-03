const express = require("express");
const {
  getElectionById,
  getElections,
} = require("../controllers/electionController");
const { protect, admin } = require("../middleware/authMiddleWare");

const router = express.Router();

router.route("/").get(protect, getElections);

router.route("/:id").get(protect, getElectionById);

module.exports = router;
