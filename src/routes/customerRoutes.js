const express = require("express");
const router = express.Router();
const protectedRoute = require("../middlewares/authMiddleware");
const validateCustomer = require("../middlewares/customerValidation");
const customerController = require("../controllers/customerController");
const role = require("../middlewares/roleMiddleware");
router.get(
  "/",
  protectedRoute,
  role(["admin", "user"]),
  customerController.getCustomers
);
router.post(
  "/",
  protectedRoute,
  role(["admin"]),
  validateCustomer,
  customerController.createCustomer
);
router.get(
  "/:id",
  protectedRoute,
  role(["user"]),
  customerController.getCustomerById
);
router.patch(
  "/:id",
  protectedRoute,
  role(["admin"]),
  validateCustomer,
  customerController.updateCustomer
);
router.delete(
  "/:id",
  protectedRoute,
  role(["admin"]),
  customerController.deleteCustomer
);

module.exports = router;
