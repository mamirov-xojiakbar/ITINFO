const { Schema, model } = require("mongoose");

const questionSchema = new Schema(
  {
    question: {
      type: String,
    },
    answer: {
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
    user_id: {
      type: String,
    },
    expert_id: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("QuestionAnswer", questionSchema);
