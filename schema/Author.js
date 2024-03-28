const { Schema, model } = require("mongoose");

const authorSchema = new Schema({
  author_first_name: {
    type: String,
    trim: true,
    reduired: true,
  },
  author_last_name: {
    type: String,
    trim: true,
  },
  author_nick_name: {
    type: String,
    reduired: true,
    trim: true,
  },
  author_email: {
    type: String,
    reduired: true,
  },
  author_phone: {
    type: String,
  },
  author_password: {
    type: String,
    reduired: true,
  },
  author_info: {
    type: String,
  },
  author_position: {
    type: String,
  },
  is_expert: {
    type: Boolean,
  },
  author_is_active: {
    type: Boolean,
  },
  author_token: {
    type: String,
  },
  author_activation_link: {
    type: String,
  },
});

module.exports = model("Author", authorSchema);
