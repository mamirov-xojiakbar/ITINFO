const { Router } = require("express");
const {
  getAllTopic,
  addTopic,
  getTopicById,
  updateTopic,
  deleteTopic,
} = require("../controllers/topic.controller");

const router = Router();

router.get("/", getAllTopic);
router.post("/", addTopic);
router.get("/:id", getTopicById);
router.put("/:id", updateTopic);
router.delete("/:id", deleteTopic);

module.exports = router;
