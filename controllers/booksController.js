const slugify = require("@sindresorhus/slugify");
const { reduceRight } = require("lodash");
const { Book, Author } = require("../db/models");

//  IMAGE
const appendMediaPathToFileFromReq = (req) => {
  const path = "http://" + req.get("host") + "/media/" + req.file.filename;
  return encodeURI(path);
};

getDatabaseBooks = async () => {
  let books = await Book.findAll({
    attributes: { exclude: ["createdAt", "updatedAt", "authorId"] },
    include: [{ model: Author, as: "author", attributes: ["name"] }],
  });
  console.log("All books: ", books);
  // Manipulating books
  //
  return books;
};

// Controllers
// GET: Fetch all
exports.getAllBooksController = async (req, res, next) => {
  try {
    console.log("Getting all ");
    let books = await getDatabaseBooks();
    res.status(200).json({ books, flag: "REQUEST {5258}" });
  } catch (e) {
    next(e);
  }
};
// GET: Fetch single
exports.getSingleBookController = async (req, res, next) => {
  res.json(req.book);
};

// POST: delete
exports.deleteBookController = async (req, res, next) => {
  const book = req.book;
  try {
    await book.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// PUT: Update
exports.updateBookController = async (req, res, next) => {
  const foundBook = req.book;
  console.log("Updating:");
  try {
    if (req.file) {
      req.body.image = appendMediaPathToFileFromReq(req);
    }
    const updatedBook = await foundBook.update(req.body);
    res
      .status(201)
      .json({ message: "Your book has been updated!", updatedBook });
  } catch (error) {
    next(error);
  }
};

// POST: Create
exports.bookCreateController = async (req, res, next) => {
  const book = req.body;
  if (req.file) {
    book.image = appendMediaPathToFileFromReq(req);
  } else if (book.imageUrl) {
    book.image = book.imageUrl;
  }
  try {
    let newBook = await Book.create(book);
    res.status(201).json(newBook);
  } catch (e) {
    next(e);
  }
};
