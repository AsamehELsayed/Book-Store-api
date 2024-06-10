const express = require("express");
const router = express.Router();
const asynchandler = require("express-async-handler");
const multer = require("multer");
const path = require('path');
const storage = multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,path.join(__dirname,"../images"))
    },
    filename:function (req,fill,cb){
        cb(null,new Date().getTime().toString() + fill.originalname)
    }
})
const upload = multer({storage})
router.post("/",upload.single("image"),asynchandler((req,res)=>{
    res.status(200).json("image uploaded")
}))
module.exports=router