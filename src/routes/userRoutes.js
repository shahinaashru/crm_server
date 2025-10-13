const express = require("express");
const router = express.Router();
const {
  registerValidation,
  loginValidation,
} = require("../middlewares/userValidation");

const userController = require("../controllers/userController");

router.post("/register", registerValidation, userController.registerUser);
router.post("/login", loginValidation, userController.loginUser);
router.post("/logout", userController.logoutUser);
module.exports = router;
