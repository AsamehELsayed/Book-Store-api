const express = require("express");
const router =express.Router();
const asynchandler = require("express-async-handler");
const bcrypt = require('bcryptjs');
const jwt =require("jsonwebtoken")
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const {User,validateRegisterUser, validatleLogin}=require("../models/users")
dotenv.config();
/** 
* @method post
* @route  /api/auth/register
* @Desc   register
* @access public
*/
router.post("/register",asynchandler(async(req,res)=>{
    const { error } = validateRegisterUser(req.body);
    if (error) {
      res.status(400).json(error);
    }
    let user=await User.findOne({email :req.body.email})
    if(user){
        res.status(400).send("user is registered")
    }
    const salt= await bcrypt.genSalt(10)
    req.body.password =await bcrypt.hash(req.body.password,salt)
        user=new User({
        UserName:req.body.UserName,
        password:req.body.password,
        email:req.body.email,
        Nationality:req.body.Nationality,
        Image:req.body.Image,
        }
        )
        const resault = await user.save()
        const token = jwt.sign({id:user._id,isAdmin:user.isAdmin,UserName:user.UserName},process.env.JWT_SECRET_KEY)
        const {password, ...other}=resault._doc
        res.status(200).json({...other,token})
    
}))
/** 
* @method post
* @route  /api/auth/login
* @Desc   login
* @access public
*/
router.post("/login",asynchandler(async(req,res)=>{
    const { error } = validatleLogin(req.body);
    if (error) {
      res.status(400).json(error);
    }
    let user=await User.findOne({email :req.body.email})
    if(!user){
        res.status(400).send("email is invaild")
    }
    let passwordMath= await bcrypt.compare(req.body.password,user.password)
    if(!passwordMath){
        res.status(400).send("passowrd is worng")
    }
        const token =  jwt.sign({id:user._id,isAdmin:user.isAdmin,UserName:user.UserName},process.env.JWT_SECRET_KEY)
        const {password, ...other}=user._doc
        res.status(200).json({...other,token})
    
}))

module.exports=router