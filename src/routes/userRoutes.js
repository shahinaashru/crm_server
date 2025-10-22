const express = require("express");
const router = express.Router();
const protectedRoute = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const userController = require("../controllers/userController");
const {
  registerValidation,
  loginValidation,
} = require("../middlewares/userValidation");
router.post(
  "/add-user",
  protectedRoute,
  role(["admin", "user"]),
  registerValidation,
  userController.addUser
);
router.post("/register", registerValidation, userController.registerUser);
router.patch(
  "/:id",
  protectedRoute,
  role(["admin", "user"]),
  userController.updateUser
);
router.get(
  "/",
  protectedRoute,
  role(["admin", "user"]),
  userController.getUsers
);
router.delete(
  "/:id",
  protectedRoute,
  role(["admin"]),
  userController.deleteUser
);
router.post("/login", loginValidation, userController.loginUser);
router.post("/logout", userController.logoutUser);
module.exports = router;
