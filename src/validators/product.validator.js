const Joi = require("joi");

exports.createProductSchema = Joi.object({
  name: Joi.string().min(3).max(150).trim().required(),
  description: Joi.string().allow("").trim(),
  price: Joi.number().positive().precision(2).required(),
  category: Joi.string().trim().required(),
  stock: Joi.number().integer().min(0).required(),
}).options({ abortEarly: false });

exports.updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(150).trim(),
  description: Joi.string().allow("").trim(),
  price: Joi.number().positive().precision(2),
  category: Joi.string().trim(),
  stock: Joi.number().integer().min(0),
}).options({ abortEarly: false });
