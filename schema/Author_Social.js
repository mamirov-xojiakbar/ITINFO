const { Schema, model } = require("mongoose");

const author_socialSchema = new Schema({
  author_id: {
    type: String,
  },
  social_id: {
    type: String,
  },
  social_link: {
    type: String,
  },
});

module.exports = model("Author_social", author_socialSchema);
