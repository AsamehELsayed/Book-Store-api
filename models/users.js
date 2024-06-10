const mongoose = require("mongoose");
const Joi = require('joi');
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    UserName: { type: String, trim: true, min: 2, required: true },
    email: { type: String, trim: true, min: 5, required: true, unique: true },
    password: { type: String, min: 8, required: true },
    Nationality: { type: String },
    Image: { type: String },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
function validatleLogin(obj) {
  const schema = Joi.object({
    email: Joi.required(),
    password: Joi.required(),
  });
  return schema.validate(obj);
}
function validatePassword(obj) {
  const schema = Joi.object({
    password: Joi.string().trim().min(8).max(100).required(),
  });
  return schema.validate(obj);
}
function validateRegisterUser(obj) {
  const schema = Joi.object({
    UserName: Joi.string().min(3).trim().required(),
    email: Joi.string().min(3).trim().required(),
    password: Joi.string().trim().min(8).max(100).required(),
    Nationality: Joi.string().trim().min(3),
    Image: Joi.string().trim(),
  });
  return schema.validate(obj);
}
function validateUpdateUser(obj) {
  const schema = Joi.object({
    UserName: Joi.string().min(3).trim(),
    email: Joi.string().min(3).trim(),
    password: Joi.string().trim().min(8).max(100),
    Nationality: Joi.string().trim().min(3),
    Image: Joi.string().trim(),
  })}
const User = mongoose.model("User", userSchema);
module.exports = {
  User,
  validateRegisterUser,
  validatleLogin,
  validateUpdateUser,
  validatePassword
};
