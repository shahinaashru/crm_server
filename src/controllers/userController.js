const User = require("../models/userModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const asyncHandler = require("../middlewares/asyncHandler");
exports.registerUser = asyncHandler(async (req, res) => {
  const { username, password, role } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    return res.status(404).json({
      status: false,
      message: "User already exist Our Database",
      User: user,
    });
  }

  const registeredUser = User.create({
    username: username,
    password: password,
    role: role,
  });
  if (!registeredUser) {
    return res.status(500).json({
      status: false,
      message: "Database error. Please try again later.",
      error: err.message,
    });
  }
  const token = jwt.sign(
    { id: registeredUser.id, role: registeredUser.role },
    process.env.JWT_SECRET || "your_secret_key",
    { expiresIn: "1d" }
  );
  res.cookie("token", token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // CSRF protection
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
  res.status(201).json({
    status: true,
    message: "User registed successfully",
    User: registeredUser,
  });
});
exports.loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || user.isActive === false) {
    return res.status(404).json({ status: false, message: "User not found" });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res
      .status(401)
      .json({ status: false, message: "Invalid Name or Password" });
  }
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET || "your_secret_key",
    { expiresIn: "1d" }
  );
  res.cookie("token", token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // CSRF protection
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
  res.status(200).json({ status: true, message: "Login Successful" });
});
exports.logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.status(200).json({
    status: true,
    message: "User logged out successfully",
  });
});
