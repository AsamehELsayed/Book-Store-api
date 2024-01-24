const express=require("express")
const router =express.Router();


router.get("/",(req,res)=>{
     
        res.send("<h1>Hello,Welcome To Express Js</h1>")
     
})
module.exports=router