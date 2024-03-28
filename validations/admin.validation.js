const Joi = require("joi");

exports.adminValidate = (data) => {
  const schema = Joi.object({
    admin_name: Joi.string().pattern(new RegExp("^[a-zA-Z]+$")).min(2).max(50),
    admin_email: Joi.string().email(),
    admin_password: Joi.string().min(6),
    admin_photo: Joi.string().default("/photo/admin.png"),
    admin_is_active: Joi.boolean().default(false),
    admin_is_creator: Joi.string(),
    created_date: Joi.date(),
    updated_date: Joi.date(),
  });
  return schema.validate(data, { abortEarly: false });
};
