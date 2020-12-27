const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  authorCreateController,
  deleteAuthorController,
  getAllAuthorsController,
  getSingleAuthorController,
  updateAuthorController,
  bookCreateController,
  getAllBooksFromAuthorController,
} = require("../controllers/authorsController");
const {
  authorParamsMiddleware,
} = require("../middleware/authorParamMiddleware");
const upload = require("../middleware/multer");

// ROUTES: GET
router.param("authorId", authorParamsMiddleware);
router.get("/", getAllAuthorsController);
router.get("/:authorId", getSingleAuthorController);
router.delete("/:authorId", deleteAuthorController);
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  authorCreateController
);
router.put("/:authorId", upload.single("image"), updateAuthorController);

// Books
router.get("/:authorId/books/", getAllBooksFromAuthorController);
router.post(
  "/:authorId/books/create",
  upload.single("image"),
  bookCreateController
);

module.exports = router;
