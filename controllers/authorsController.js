const slugify = require("@sindresorhus/slugify");
const { Author, User, Book } = require("../db/models");

//  IMAGE
const appendMediaPathToFileFromReq = (req) => {
  const path = "http://" + req.get("host") + "/media/" + req.file.filename;
  return encodeURI(path);
};

getDatabaseAuthors = async () => {
  const authors = await Author.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: [
      { model: Book, as: "books", attributes: ["name"] },
      { model: User, as: "user", attributes: ["name"] },
    ],
    // raw: true,
    group: ["Author.id", "Book.id"],
  });
  console.log("All authors: ", authors);
  return authors;
};

// Controllers
// GET: Fetch all
exports.getAllAuthorsController = async (req, res, next) => {
  try {
    console.log("Getting all ");
    let authors = await getDatabaseAuthors();
    res.status(200).json(authors);
  } catch (e) {
    next(e);
  }
};
// GET: Fetch single
exports.getSingleAuthorController = async (req, res, next) => {
  res.json(req.author);
};

// POST: delete
exports.deleteAuthorController = async (req, res, next) => {
  const author = req.author;
  try {
    await author.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// PUT: Update
exports.updateAuthorController = async (req, res, next) => {
  const foundAuthor = req.author;
  console.log("Updating:");
  try {
    if (req.file) {
      req.body.image = appendMediaPathToFileFromReq(req);
    }
    const updatedAuthor = await foundAuthor.update(req.body);
    res
      .status(201)
      .json({ message: "Your author has been updated!", updatedAuthor });
  } catch (error) {
    next(error);
  }
};

// POST: Create
exports.authorCreateController = async (req, res, next) => {
  if (req.file) {
    req.body.image = appendMediaPathToFileFromReq(req);
  }
  console.log("REQ:", req.user);
  req.body.userId = req.user.id;
  try {
    let newAuthor = await Author.create(req.body);
    res.status(201).json(newAuthor);
  } catch (e) {
    next(e);
  }
};

// Books
// GET: Fetch all books from author
exports.getAllBooksFromAuthorController = async (req, res, next) => {
  const authorId = req.author.id;
  console.log("AuthorId🍪: ", authorId);
  try {
    console.log("Getting all Books from author");
    let authors = await Book.findAll({
      where: {
        authorId: authorId,
      },
    });
    res.status(200).json(authors);
  } catch (e) {
    next(e);
  }
};
// POST: Create
exports.bookCreateController = async (req, res, next) => {
  const authorId = req.author.id;
  console.log("AuthorId🍪: ", authorId);
  const book = req.body;
  book.authorId = authorId;
  if (req.file) {
    req.body.image = appendMediaPathToFileFromReq(req);
  }
  try {
    let newBook = await Book.create(book);
    res.status(201).json(newBook);
  } catch (e) {
    next(e);
  }
};
