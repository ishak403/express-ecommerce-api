const Joi = require("joi");

exports.addToCartSchema = Joi.object({
  productId: Joi.number().integer().positive().required(),
  quantity: Joi.number().integer().min(1).required(),
}).options({ abortEarly: false });

exports.updateQuantitySchema = Joi.object({
  quantity: Joi.number().integer().min(1).required(),
}).options({ abortEarly: false });
