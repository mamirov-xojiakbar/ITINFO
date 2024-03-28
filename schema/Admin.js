const { Schema, model } = require("mongoose");

const adminSchema = new Schema({
  admin_name: {
    type: String,
    required: true,
    trim: true,
  },
  admin_email: {
    type: String,
    required: true,
    unique: true,
  },
  admin_password: {
    type: String,
    required: true,
  },
  admin_photo: {
    type: String,
  },
  admin_is_active: {
    type: Boolean,
  },
  admin_is_creator: {
    type: String,
  },
  created_date: {
    type: Date,
  },
  updated_date: {
    type: Date,
  },
  admin_token: {
    type: String,
  },
  admin_activation_link: {
    type: String,
  },
});

module.exports = model("Admin", adminSchema);
