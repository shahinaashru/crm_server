const Joi = require("joi");
const registerValSchema = Joi.object({
  username: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Username is required",
    "string.min": "Name must be at least 2 characters",
  }),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one number, and one special character",
    }),
  role: Joi.string().valid("admin", "user").optional(),
});

const loginValSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "Username is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});
function registerValidation(req, res, next) {
  const { error } = registerValSchema.validate(req.body, { convert: true });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      error: error.details[0].message,
    });
  }

  next();
}
function loginValidation(req, res, next) {
  const { error } = loginValSchema.validate(req.body, { convert: true });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      error: error.details[0].message,
    });
  }

  next();
}

module.exports = {
  registerValidation,
  loginValidation,
};
