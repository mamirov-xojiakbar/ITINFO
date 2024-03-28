const express = require("express");
const {
  getAllCategory,
  addCategory,
  updateCategory,
  getCategoryById,
  deleteCategory,
} = require("../controllers/category.controller");

const router = express.Router();

router.get("/", getAllCategory);
router.post("/", addCategory);
router.put("/:id", updateCategory);
router.get("/:id", getCategoryById);
router.delete("/:id", deleteCategory);

module.exports = router;
