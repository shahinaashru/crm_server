const express = require("express");
const router = express.Router();
const caseController = require("../controllers/caseController");
const role = require("../middlewares/roleMiddleware");
const caseValidator = require("../middlewares/caseValidation");
const protected = require("../middlewares/authMiddleware");
router.get("/", protected, role(["admin", "user"]), caseController.getCases);
router.get(
  "/:id",
  protected,
  role(["admin", "user"]),
  caseController.getCaseById
);
router.post(
  "/",
  protected,
  role(["admin"]),
  caseValidator,
  caseController.createCase
);
router.patch(
  "/:id",
  protected,
  role(["admin", "user"]),
  caseController.updateCase
);
module.exports = router;
