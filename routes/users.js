const express = require("express");
const router = express.Router();
const asynchandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, validateUpdateUser } = require("../models/users");
const { verifyTokenAuth, verifyAdmin } = require("../middlewares/verifyToken");

/** 
* @method put
* @route  /api/users
* @Desc   update user
* @access private (admin||user)
*/
router.put(
  "/:id",
  verifyTokenAuth,
  asynchandler(async (req, res) => {
    const error = validateUpdateUser(req.body);
    if (error) {
      return res.status(400).json(error);
    }
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          UserName: req.body.UserName,
          password: req.body.password,
          email: req.body.email,
          Nationality: req.body.Nationality,
          Image: req.body.Image,
        },
      },
      { new: true }
    );
    if (updateUser) {
      res.status(200).json(updateUser);
    } else {
      res.status(400).json("user not found");
    }
  })
);
/** 
* @method get
* @route  /api/users
* @Desc   get users
* @access private (adimn)
*/
router.get(
  "/",
  verifyAdmin,
  asynchandler(async (req, res) => {
    const users = await User.find().select("-password");
    res.status(201).json(users);
  })
);
router.get(
  "/:id",
  verifyTokenAuth,
  asynchandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(201).json(user);
    } else {
      res.status(404).json("not found");
    }
  })
);
/** 
* @method get
* @route  /api/users/:id
* @Desc   delete
* @access private (admin)
*/
router.delete(
  "/:id",
  verifyTokenAuth,
  asynchandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      res.status(200).send("deleted")
  } else {
      res.status(400).send("nor found")
  }
  })
);
module.exports = router;