const asynchandler = require("express-async-handler");
const { User, validatePassword } = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");

const getForgotPassword = asynchandler(async (req, res) => {
  res.render("forgotpassword");
});

const postPassword = asynchandler(async (req, res) => {
  console.log(req.body.email);
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json("user not found");
  }
  const secret = process.env.JWT_SECRET_KEY + user.password;
  const token = jwt.sign({ email: user.email, id: user.id }, secret, {
    expiresIn: "10m",
  });
  const Link = `http://localhost:${process.env.PORT}/password/resetpassword/${user._id}/${token}`;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.APP_MAIL,
      pass: process.env.APP_PASS
    }
  });
  const mailoption = {
    from: process.env.APP_MAIL,
    to: user.email,
    subject: "reset yout password",
    html: `<div>
        <h1>reset password</h1>
        <p>to reset your password click here ${Link}</p>
        
        </div>`,
  };
  transporter.sendMail(mailoption, function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log(success);
      res.render("checkpassword");
    }
  });
});
const resetPassword = asynchandler(async (req, res) => {
  console.log(req.body.email);
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json("user not found");
  }
  const secret = process.env.JWT_SECRET_KEY + user.password;
  try {
    jwt.verify(req.params.token, secret);
    res.render("resetpassword", { email: user.email });
  } catch (error) {
    res.json(error);
  }
});

const savePassword = asynchandler(async (req, res) => {
  const {error}= validatePassword(req.body)
  if (error) {
    res.json(error)
  }else{

    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json("user not found");
    }
    const secret = process.env.JWT_SECRET_KEY + user.password;
    try {
      jwt.verify(req.params.token, secret);
  
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      user.password = req.body.password;
      user.save();
      res.render("successpassword");
    } catch (error) {
      res.json(error);
    }
  }
});
module.exports = {
  getForgotPassword,
  postPassword,
  resetPassword,
  savePassword,
};
