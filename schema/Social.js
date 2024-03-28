const { Schema, model } = require("mongoose");

const socialSchema = new Schema({
  social_name: {
    type: String,
  },
  social_icon_file: {
    type: String,
  },
});

module.exports = model("Social", socialSchema);
