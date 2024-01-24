const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const bookSchema = new Schema(
  {
    title: { type: String, require: true, min: 3 },
    description: { type: String,require: true, min: 3  },
    author: { type: mongoose.Schema.Types.ObjectId,require: true, min: 3,ref:"Author"  },
    price: { type: Number },
  },
  {
    timestamps: true,
  }
);

function validateSchema(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().required().min(3),
    author: Joi.string().trim().required().min(3),
    description:Joi.string().trim().required().min(3),
    price: Joi.number().required().min(0).max(2000000000),
  });
  return schema.validate(obj);
}
function validateUpdateSchema(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3),
    author: Joi.string().trim().min(3),
    description:Joi.string().trim().min(3),
    price: Joi.number().required().min(0).max(2000000000),
  });
  return schema.validate(obj);
}
const Book = mongoose.model("Book", bookSchema);
module.exports = {
  Book,
  validateSchema,
  validateUpdateSchema,
};
