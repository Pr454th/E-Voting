const express = require("express");
const router = express.Router();
const {
  getElectionResult,
  getElections,
} = require("../controllers/electionController");
const { protect, admin } = require("../middleware/authMiddleWare");

//Election Result
//Election ID-id
router.route("/result/:id").get(getElectionResult);

//Elections list
router.route("/").get(getElections);

module.exports = router;
