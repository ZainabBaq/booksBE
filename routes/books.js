const express = require("express");
const router = express.Router();
const {
  bookCreateController,
  getSingleBookController,
  deleteBookController,
  updateBookController,
  getAllBooksController,
} = require("../controllers/booksController");
const { bookParamsMiddleware } = require("../middleware/bookParamMiddleware");
const upload = require("../middleware/multer");
router.post("/create", bookCreateController);
// ROUTES: GET
router.param("bookId", bookParamsMiddleware);
router.get("/", getAllBooksController);
router.get("/:bookId", getSingleBookController);
router.delete("/:bookId", deleteBookController);
router.put("/:bookId", upload.single("image"), updateBookController);
module.exports = router;
