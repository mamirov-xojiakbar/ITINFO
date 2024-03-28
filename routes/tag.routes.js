const { Router } = require("express");
const {
  getAllTag,
  addTag,
  getTagById,
  updateTag,
  deleteTag,
} = require("../controllers/tag.controller");

const router = Router();

router.get("/", getAllTag);
router.post("/", addTag);
router.get("/:id", getTagById);
router.put("/:id", updateTag);
router.delete("/:id", deleteTag);

module.exports = router;
