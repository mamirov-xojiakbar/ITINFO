const { Router } = require("express");

const dictRoute = require("./dict.routes");
const authorRoute = require("./author.routes");
const categoryRoute = require("./category.routes");
const userRoute = require("./user.routes");
const adminRoute = require("./admin.routes");
const questionRoute = require("./question.routes");
const topicRoute = require("./topic.routes");

const router = Router();

router.use("/dict", dictRoute);
router.use("/author", authorRoute);
router.use("/category", categoryRoute);
router.use("/user", userRoute);
router.use("/admin", adminRoute);
router.use("/question", questionRoute);
router.use("/topic", topicRoute);

module.exports = router;
