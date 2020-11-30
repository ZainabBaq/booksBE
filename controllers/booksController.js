// let books = require("../books.json");

const slugify = require("slugify");
const { Book } = require("../db/models");

// Actions (LOCAL)
// const findBook = (bookId) => books.find((b) => b.id === +bookId);
// const deleteBook = (bookId) => (books = books.filter((b) => b.id != bookId));
// const createBook = (book) => {
//   const newBook = {
//     id: books[books.length - 1].id + 1,
//     slug: slugify(book.name),
//     ...book,
//   };
//   console.log("✏️ Book Creation: ", book);
//   books.push(newBook);
// };
// const updateBook = (bookId, newBook) => {
//   let foundBook = findBook(bookId);
//   Object.assign(foundBook, newBook);
//   return foundBook;
// };

// const getLocalBooks = () => {
//   return books;
// };

const findBook = async (bookId) => {
  const foundBook = await Book.findByPk(bookId, {
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  return foundBook;
};

getDatabaseBooks = async () => {
  const books = await Book.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  console.log("All books: ", books);
  return books;
};

// Controllers
exports.getAllBooksController = async (req, res) => {
  try {
    console.log("Getting all ");
    let books = await getDatabaseBooks();
    res.status(200).json(books);
  } catch (e) {
    res.status(500).json({ message: error.message });
  }
};

const appendMediaPathToFileFromReq = (req) => {
  const path = "http://" + req.get("host") + "/media/" + req.file.filename;
  return encodeURI(path);
};

exports.getSingleBookController = async (req, res) => {
  console.log("Getting a single book");
  try {
    const { bookId } = req.params;
    const book = await findBook(bookId);
    res.json(book);
  } catch (error) {
    //
    res
      .status(404)
      .send({ message: `Your book with id ${bookId} is not found!` });
  }
};

exports.deleteBookController = async (req, res) => {
  console.log("Deleting a book");
  const { bookId } = req.params;
  console.log("BookID:", bookId);
  let book;
  try {
    book = await findBook(bookId);
    await book.destroy();
    console.log("Deleted", book);
    res.status(204).end();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.bookCreateController = async (req, res) => {
  console.log("Creating a book");
  const book = req.body;
  if (book) {
    if (req.file) {
      book.image = appendMediaPathToFileFromReq(req);
    }
    try {
      let newBook = await Book.create(book);
      res.status(201).json(newBook);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  } else {
    res.status(204).send({ message: "Please make sure to fill all fields!" });
  }
};

exports.updateBookController = async (req, res) => {
  const newBook = req.body;
  if (req.file) {
    newBook.image = appendMediaPathToFileFromReq(req);
  }
  console.log("Updating  a book");
  const { bookId } = req.params;
  try {
    const foundBook = await findBook(bookId);
    const updatedBook = await foundBook.update(newBook);
    res
      .status(201)
      .json({ message: "Your book has been updated!", updatedBook });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
