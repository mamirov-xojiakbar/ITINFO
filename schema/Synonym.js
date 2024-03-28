const { Schema, model } = require("mongoose");

const synonymSchema = new Schema({
  desc_id: {
    type: String,
  },
  dict_id: {
    type: String,
  },
});

module.exports = model("Synonym", synonymSchema);
