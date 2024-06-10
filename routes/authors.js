const express=require("express")
const router =express.Router();

const {verifyAdmin } = require("../middlewares/verifyToken");
const { getAuthor, getAuthors, createAuthor, UpdateAuthor, deleteAuthor } = require("../controllers/authorsController");
router.route("/").get(getAuthors).post(verifyAdmin ,createAuthor)
router.route("/:id").get(getAuthor).put(verifyAdmin ,UpdateAuthor).delete(verifyAdmin ,deleteAuthor)




module.exports=router