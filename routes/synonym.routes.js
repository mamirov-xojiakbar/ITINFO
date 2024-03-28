const { Router } = require("express");
const {
  getAllSynonym,
  addSynonym,
  getSynonymById,
  updateSynonym,
  deleteSynonym,
} = require("../controllers/synonym.controller");

const router = Router();

router.get("/", getAllSynonym);
router.post("/", addSynonym);
router.get("/:id", getSynonymById);
router.put("/:id", updateSynonym);
router.delete("/:id", deleteSynonym);

module.exports = router;
