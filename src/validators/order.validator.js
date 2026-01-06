const Joi = require("joi");

exports.updateOrderStatusSchema = Joi.object({
  status: Joi.string()
    .valid("pending", "paid", "shipped")
    .required(),
});
