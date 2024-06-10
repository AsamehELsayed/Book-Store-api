const {
  Author,
  validateUpdateSchema,
  validateSchema,
} = require("../models/authors.js");
const asynchandler = require("express-async-handler");

/** 
* @method get
* @route  /api/authors
* @Desc   get authors api
* @access public
*/
const getAuthors = asynchandler(async (req, res) => {
  const { pageNumber } = req.query;
  const aurhorsPerPage = 2;
  const authorsList = await Author.find()
    .skip((pageNumber - 1) * aurhorsPerPage)
    .limit(aurhorsPerPage);
  res.status(200).json(authorsList);
});
/** 
* @method get
* @route  /api/authors/:id
* @Desc   get author api
* @access public
*/
const getAuthor = asynchandler(async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (author) {
    res.json(author);
  } else {
    res.status(404).send("author not found");
  }
});
/** 
* @method post
* @route  /api/authors/
* @Desc  make author api
* @access public
*/
const createAuthor = asynchandler(async (req, res) => {
  const { error } = validateSchema(req.body);
  if (error) {
    res.status(400).json(error);
  }

  const author = new Author({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Image: req.body.Image,
    Nationality: req.body.Nationality,
  });
  const resault = await author.save();
  res.status(201).json(resault);
});
/** 
* @method put
* @route  /api/authors/:id
* @Desc  update author api
* @access public
*/
const UpdateAuthor = asynchandler(async (req, res) => {
  const { error } = validateUpdateSchema(req.body);
  if (error) {
    res.status(400).json(error);
  }
  try {
    const author = await Author.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          FirstName: req.body.FirstName,
          LastName: req.body.LastName,
          Image: req.body.Image,
          Nationality: req.body.Nationality,
        },
      },
      { new: true }
    );
    res.status(200).send(author);
  } catch (error) {
    console.log(error);
  }
});
/** 
* @method delated
* @route  /api/authors/:id
* @Desc  delate author api
* @access public
*/
const deleteAuthor = asynchandler(async (req, res) => {
  const author = await Author.findByIdAndDelete(req.params.id);
  if (author) {
    res.status(200).send("deleted");
  } else {
    res.status(400).send("error");
  }
});

module.exports = {
  getAuthor,
  getAuthors,
  createAuthor,
  UpdateAuthor,
  deleteAuthor,
};
