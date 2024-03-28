const { Router } = require("express");
const {
  addTerm,
  getByTermLetter,
  getAllTerm,
  getTerm,
} = require("../controllers/dict.controler");

const router = Router();

router.post("/", addTerm);
router.get("/:letter", getByTermLetter);
router.get("/", getAllTerm);
router.get("/term/:term", getTerm)

module.exports = router;
