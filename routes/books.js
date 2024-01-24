const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Joi = require("joi");
const {
  validateSchema,
  validateUpdateSchema,
  Book,
} = require("../models/books");
const {verifyAdmin } = require("../middlewares/verifyToken");
const asynchandler = require("express-async-handler");

/**
 * @method get
 * @route  /api/books/
 * @Desc  get books api
 * @access public
 */
router.get(
  "/",
  asynchandler(async (req, res) => {
    const bookslist = await Book.find().populate("author", [
      "FirstName",
      "LastName",
    ]);
    res.status(200).json(bookslist);
  })
);
/**
 * @method get
 * @route  /api/books/:id
 * @Desc  get book api
 * @access public
 */
router.get(
  "/:id",
  asynchandler(async (req, res) => {
    const book = await Book.findById(req.params.id).populate("author");
    if (book) {
      res.json(book);
    } else {
      res.status(404).send("Book not found");
    }
  })
);
/**
 * @method post
 * @route  /api/books
 * @Desc  make books api
 * @access private (adimn)
 */
router.post(
  "/",
  verifyAdmin,
  asynchandler(async (req, res) => {
    const { error } = validateSchema(req.body);
    if (error) {
      res.status(400).json(error);
    }
    const book = new Book({
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      price: req.body.price,
    });
    const resault = await book.save();
    res.status(201).json(resault);
  })
);
/**
 * @method put
 * @route  /api/books/:id
 * @Desc  update books api
 * @access private (adimn)
 */
router.put(
  "/:id",
  verifyAdmin,
  asynchandler(async (req, res) => {
    const { error } = validateUpdateSchema(req.body);
    if (error) {
      res.status(400).json(error);
    }
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          author: req.body.author,
          price: req.body.price,
        },
      },
      { new: true }
    );
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).send("Book not found");
    }
  })
);
/**
 * @method delated
 * @route  /api/books/:id
 * @Desc  delate book api
 * @access private (adimn)
 */
router.delete(
  "/:id",
  verifyAdmin,
  asynchandler(async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (book) {
      res.status(200).json({ message: "deleted" });
      res.status(200).json(book);
    } else {
      res.status(404).send("Book not found");
    }
  })
);

module.exports = router;
