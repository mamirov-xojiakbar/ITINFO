const { Schema, model } = require("mongoose");

const descQaSchema = new Schema({
  qa_id: {
    type: String,
  },
  desc_id: {
    type: String,
  },
});

module.exports = model("Desc_QA", descQaSchema);
