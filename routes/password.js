const express = require("express");
const router = express.Router();
const { getForgotPassword, postPassword, savePassword, resetPassword } = require("../controllers/passwordController");

router.route("/forgotPassword").get(getForgotPassword).post(postPassword)
router.route("/resetpassword/:userId/:token").get(resetPassword).post(savePassword)
module.exports=router