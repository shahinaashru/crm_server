const Joi = require("joi");
const createCaseSchema = Joi.object({
  customer_id: Joi.string().required().messages({
    "any.required": "Customer ID is required",
    "string.empty": "Customer ID cannot be empty",
  }),

  assigned_to: Joi.string().required().messages({
    "any.required": "Assigned To is required",
    "string.empty": "Assigned To cannot be empty",
  }),

  case_name: Joi.string().trim().min(3).max(100).required().messages({
    "string.base": "Case name must be a string",
    "string.empty": "Case name is required",
    "string.min": "Case name must have at least 3 characters",
    "string.max": "Case name cannot exceed 100 characters",
  }),

  case_description: Joi.string().trim().max(500).allow("", null).messages({
    "string.max": "Case description cannot exceed 500 characters",
  }),

  priority: Joi.string()
    .valid("low", "medium", "high", "urgent")
    .default("medium")
    .messages({
      "any.only": "Priority must be one of: low, medium, high, urgent",
    }),

  status: Joi.string()
    .valid("open", "in_progress", "on_hold", "resolved", "closed")
    .default("open")
    .messages({
      "any.only": "Status must be one of: open, in_progress, resolved, closed",
    }),

  created_at: Joi.date().default(Date.now),
});

// Middleware factory to validate request body
const validateCase = (req, res, next) => {
  const { error } = createCaseSchema.validate(req.body, { convert: true });
  if (error)
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  next();
};

module.exports = validateCase;
