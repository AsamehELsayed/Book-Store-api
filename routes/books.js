const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middlewares/verifyToken");
const {
  getBooks,
  getBook,
  uptadeBooks,
  deleteBooks,
  createBook,
} = require("../controllers/booksController");

router.route("/").get(getBooks).post(verifyAdmin, createBook);
router.route("/:id").get(getBook).put( verifyAdmin, uptadeBooks).delete(verifyAdmin, deleteBooks);


module.exports = router;
