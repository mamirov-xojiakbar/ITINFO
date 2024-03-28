const express = require("express");
const {
  getAllQuestion,
  addQuestion,
  updateQuestion,
  getQuestionById,
  deleteQuestion,
} = require("../controllers/question.controller");

const router = express.Router();

router.get("/", getAllQuestion);
router.post("/", addQuestion);
router.put("/:id", updateQuestion);
router.get("/:id", getQuestionById);
router.delete("/:id", deleteQuestion);

module.exports = router;
