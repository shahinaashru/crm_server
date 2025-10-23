const User = require("../models/userModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const asyncHandler = require("../middlewares/asyncHandler");
exports.getUsers = asyncHandler(async (req, res) => {
  const user = await User.find({ isActive: true }).lean();
  if (user.length === 0) {
    return res.status(404).json({
      status: false,
      message: "User List is Empty",
    });
  }
  res.status(200).json({
    status: true,
    message: "User Retrieved Successfully",
    User: user,
  });
});
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
    //sameSite: "lax", // CSRF protection
    secure: true, // must be HTTPS
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
  res.status(201).json({
    status: true,
    message: "User registed successfully",
    User: registeredUser,
  });
});
exports.addUser = asyncHandler(async (req, res) => {
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
    // sameSite: "lax", // CSRF protection
    secure: true, // must be HTTPS
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
  res
    .status(200)
    .json({ status: true, message: "Login Successful", User: user });
});
exports.logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    secure: true, // must be HTTPS
    sameSite: "none",
  });
  res.status(200).json({
    status: true,
    message: "User logged out successfully",
  });
});
exports.updateUser = asyncHandler(async (req, res) => {
  const { email, phone_number, address } = req.body;
  const { id } = req.params;
  const existingUser = await User.findOne({ _id: id, isActive: true });
  if (!existingUser) {
    return res.status(400).json({ status: false, message: "User Not  Exist" });
  }
  let updateData = {};
  if (email) updateData.email = email;
  if (phone_number) updateData.phone_number = phone_number;
  if (address) updateData.address = address;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  );
  if (!updatedUser) {
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
  res.status(201).json({
    status: true,
    message: "User Details Updated Successfully",
    User: updatedUser,
  });
});
exports.deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  }
  user.isActive = false;
  await user.save();
  res.status(200).json({
    success: true,
    message: "user deleted successfully (soft delete)",
    user: user,
  });
});
