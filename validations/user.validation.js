const Joi = require("joi");

exports.userValidate = (data) => {
  const schema = Joi.object({
    user_name: Joi.string().pattern(new RegExp("^[a-zA-Z]+$")).min(2).max(50),
    user_email: Joi.string().email(),
    user_password: Joi.string().min(6),
    user_info: Joi.string(),
    user_photo: Joi.string().default("/photo/user.png"),
    created_date: Joi.date(),
    updated_date: Joi.date(),
    user_is_active: Joi.boolean().default(false),
  });
  return schema.validate(data, { abortEarly: false });
};
