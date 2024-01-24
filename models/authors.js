const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const authorSchema = new Schema(
  {
    FirstName: { type: String, min: 2, max: 200, required: true },
    LastName: { type: String, min: 2, max: 200, required: true },
    Image: { type: String, min: 2, required: true },
    Nationality: { type: String, min: 2, max: 200, required: true },
  },
  {
    timestamps: true,
  }
);
function validateUpdateSchema(obj) {
  const schema = Joi.object({
    FirstName: Joi.string().trim().min(1).max(200),
    LastName: Joi.string().trim().min(1).max(200),
    Nationality: Joi.string().trim().min(1),
    Image: Joi.string().trim(),
  });
  return schema.validate(obj);
}
function validateSchema(obj) {
  const schema = Joi.object({
    FirstName: Joi.string().trim().min(1).max(200).required(),
    LastName: Joi.string().trim().min(1).max(200).required(),
    Nationality: Joi.string().trim().min(1).required(),
    Image: Joi.string().trim().required(),
  });
  return schema.validate(obj);
}
const Author = mongoose.model("Author", authorSchema);
module.exports = {
  Author,
  validateSchema,
  validateUpdateSchema,
};
