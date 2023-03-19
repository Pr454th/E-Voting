const express = require("express");
const { authUser, registerUser } = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleWare");

const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);

module.exports = router;
