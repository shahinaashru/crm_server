const Joi = require("joi");

// Create customer validation schema
const createCustomerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Customer name is required",
    "string.min": "Customer name must be at least 2 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please enter a valid email",
  }),
  phone_number: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      "string.empty": "Phone number is required",
      "string.pattern.base": "Phone number must be 10-15 digits",
    }),
  address: Joi.string().optional(),
});

// Middleware factory to validate request body
const validateCustomer = (req, res, next) => {
  const { error } = createCustomerSchema.validate(req.body, { convert: true });
  if (error)
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  next();
};

module.exports = validateCustomer;
