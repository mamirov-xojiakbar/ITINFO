const { Router } = require("express");
const {
  getAllDesc_qa,
  addDesc_qa,
  getDesc_qaById,
  updateDesc_qa,
  deleteDesc_qa,
} = require("../controllers/desc_qa.controller");

const router = Router();

router.get("/", getAllDesc_qa);
router.post("/", addDesc_qa);
router.get("/:id", getDesc_qaById);
router.put("/:id", updateDesc_qa);
router.delete("/:id", deleteDesc_qa);

module.exports = router;
