const { Schema, model } = require("mongoose");

const tagSchema = new Schema({
  topic_id: {
    type: String,
  },
  category_id: {
    type: String,
  },
});

module.exports = model("Tag", tagSchema);
