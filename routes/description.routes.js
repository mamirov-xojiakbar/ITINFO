const { Router } = require("express");
const {
  getAllDescription,
  addDescription,
  getDescriptionById,
  updateDescription,
  deleteDescription,
} = require("../controllers/description");

const router = Router();

router.get("/", getAllDescription);
router.post("/", addDescription);
router.get("/:id", getDescriptionById);
router.put("/:id", updateDescription);
router.delete("/:id", deleteDescription);

module.exports = router;
