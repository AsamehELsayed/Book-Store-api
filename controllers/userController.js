const asynchandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateUpdateUser } = require("../models/users");
/** 
* @method put
* @route  /api/users
* @Desc   update user
* @access private (admin||user)
*/
const updateUser=asynchandler(async (req, res) => {
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
  /** 
* @method delete
* @route  /api/users/:id
* @Desc   delete
* @access private (admin)
*/
const deleteUser=asynchandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      res.status(200).send("deleted")
  } else {
      res.status(400).send("nor found")
  }
  })
  /** 
* @method get
* @route  /api/users
* @Desc   get users
* @access private (adimn)
*/
const getUsers=asynchandler(async (req, res) => {
    const users = await User.find().select("-password");
    res.status(201).json(users);
  })
  /** 
* @method get
* @route  /api/user/:id
* @Desc   get user
* @access private (adimn)
*/
const getUser= asynchandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(201).json(user);
    } else {
      res.status(404).json("not found");
    }
  })



module.exports={
    updateUser,deleteUser,getUsers,getUser
}