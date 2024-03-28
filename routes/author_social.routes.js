const { Router } = require("express");
const {
  getAllAuthor_social,
  addAuthor_social,
  getAuthor_socialById,
  updateAuthor_social,
  deleteAuthor_social,
} = require("../controllers/author_social.controller");

const router = Router();

router.get("/", getAllAuthor_social);
router.post("/", addAuthor_social);
router.get("/:id", getAuthor_socialById);
router.put("/:id", updateAuthor_social);
router.delete("/:id", deleteAuthor_social);

module.exports = router;
