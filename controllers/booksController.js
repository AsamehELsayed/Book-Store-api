const {
  validateSchema,
  validateUpdateSchema,
  Book,
} = require("../models/books");
const asynchandler = require("express-async-handler");
/**
 * @method get
 * @route  /api/books/
 * @Desc  get books api
 * @access public
 */
const getBooks = asynchandler(async (req, res) => {
  const { maxPrice, minPrice } = req.query;
  if (maxPrice && minPrice) {
    const bookslist = await Book.find({
      price: { $gte: minPrice, $lte: maxPrice },
    }).populate("author", ["FirstName", "LastName"]);
    res.status(200).json(bookslist);
  } else if (maxPrice) {
    const bookslist = await Book.find({
      price: { $lte: maxPrice },
    }).populate("author", ["FirstName", "LastName"]);
    res.status(200).json(bookslist);
  } else if (minPrice) {
    const bookslist = await Book.find({
      price: { $gte: minPrice },
    }).populate("author", ["FirstName", "LastName"]);
    res.status(200).json(bookslist);
  } else {
    const bookslist = await Book.find({}).populate("author", [
      "FirstName",
      "LastName",
    ]);
    res.status(200).json(bookslist);
  }
});
/**
 * @method get
 * @route  /api/books/:id
 * @Desc  get book api
 * @access public
 */
const getBook = asynchandler(async (req, res) => {
  const book = await Book.findById(req.params.id).populate("author");
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
});
/**
 * @method post
 * @route  /api/books
 * @Desc  make books api
 * @access private (adimn)
 */
const createBook = asynchandler(async (req, res) => {
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
});
/**
 * @method put
 * @route  /api/books/:id
 * @Desc  update books api
 * @access private (adimn)
 */
const uptadeBooks = asynchandler(async (req, res) => {
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
});
/**
 * @method delated
 * @route  /api/books/:id
 * @Desc  delate book api
 * @access private (adimn)
 */
const deleteBooks = asynchandler(async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (book) {
    res.status(200).json({ message: "deleted" });
    res.status(200).json(book);
  } else {
    res.status(404).send("Book not found");
  }
});
module.exports = {
  getBooks,
  getBook,
  uptadeBooks,
  deleteBooks,
  createBook,
};
