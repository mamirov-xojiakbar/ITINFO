const { Schema, model } = require("mongoose");

const desc_topicSchema = new Schema({
  desc_id: {
    type: String,
  },
  topic_id: {
    type: String,
  },
});

module.exports = model("Desc_topic", desc_topicSchema);
