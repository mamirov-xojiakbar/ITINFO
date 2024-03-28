const { Router } = require("express");
const {
  getAllSocial,
  addSocial,
  getSocialById,
  updateSocial,
  deleteSocial,
} = require("../controllers/social.controller");

const router = Router();

router.get("/", getAllSocial);
router.post("/", addSocial);
router.get("/:id", getSocialById);
router.put("/:id", updateSocial);
router.delete("/:id", deleteSocial);

module.exports = router;
