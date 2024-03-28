const { Schema, model } = require("mongoose");

const topicSchema = new Schema({
  author_id: {
    type: String,
  },
  topic_title: {
    type: String,
  },
  topic_text: {
    type: String,
  },
  created_date: {
    type: Date,
  },
  updated_date: {
    type: Date,
  },
  is_chaked: {
    type: String,
  },
  is_approved: {
    type: String,
  },
  expert_id: {
    type: String,
  },
});

module.exports = model("Topic", topicSchema);
