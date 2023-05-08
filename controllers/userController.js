const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("express-async-handler");

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    data = {
      _id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    };
    res.cookie("token", data.token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.status(201).json(data);
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const loggedInUser = asyncHandler(async (req, res) => {
  try {
    const token = req.cookies["token"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    data = {
      _id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    };
    res.status(201).json(data);
  } catch (error) {
    res.status(401);
    throw new Error("Not Authorized, Token Failed");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, gender, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exsist");
  }

  const user = await User.create({
    name,
    email,
    gender,
    password,
  });

  if (user) {
    data = {
      _id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    };
    res.cookie("token", data.token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.status(201).json(data);
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.status(201).json({ message: "Logged Out" });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.gender = req.body.gender || user.gender;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      gender: updatedUser.gender,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User Removed" });
  } else {
    res.status(404);
    throw new Error({ message: "User Not Found" });
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error({ message: "User Not Found" });
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.gender = req.body.gender || user.gender;
    user.isAdmin = req.body.isAdmin;
    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      gender: updateUser.gender,
      isAdmin: updateUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

module.exports = {
  authUser,
  loggedInUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUserById,
  getUserById,
  updateUserById,
};
