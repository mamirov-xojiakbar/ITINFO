const { Router } = require("express");
const {
  getAllDesc_topic,
  addDesc_topic,
  getDesc_topicById,
  updateDesc_topic,
  deleteDesc_topic,
} = require("../controllers/desc_topic.controller");

const router = Router();

router.get("/", getAllDesc_topic);
router.post("/", addDesc_topic);
router.get("/:id", getDesc_topicById);
router.put("/:id", updateDesc_topic);
router.delete("/:id", deleteDesc_topic);

module.exports = router;
