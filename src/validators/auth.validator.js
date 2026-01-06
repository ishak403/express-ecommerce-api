const Joi = require("joi");

exports.registerSchema = Joi.object({
  name: Joi.string().min(3).max(100).trim().required(),
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string()
    .min(6)
    .max(50)
    .required(),
}).options({ abortEarly: false });

exports.loginSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().required(),
}).options({ abortEarly: false });
