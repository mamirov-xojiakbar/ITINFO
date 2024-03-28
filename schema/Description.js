const { Schema, model } = require("mongoose");

const descriptionSchema = new Schema({
  category_id: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = model("Description", descriptionSchema);
