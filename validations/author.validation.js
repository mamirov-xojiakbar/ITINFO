const Joi = require("joi");

const authorFullName = (parent) => {
  return parent.author_first_name + " " + parent.author_last_name;
};

exports.authorValidation = (data) => {
  const schema = Joi.object({
    author_first_name: Joi.string()
      .pattern(new RegExp("^[a-zA-Z]+$"))
      .min(2)
      .max(50),
    author_last_name: Joi.string()
      .pattern(new RegExp("^[a-zA-Z]+$"))
      .min(2)
      .max(50),
    author_full_name: Joi.string().default(authorFullName),
    author_nick_name: Joi.string(),
    author_password: Joi.string().min(6),
    confirm_password: Joi.ref("author_password"),
    author_email: Joi.string().email(),
    author_phone: Joi.string().pattern(/^\d{2}-\d{3}-\d{2}-\d{2}$/),
    author_info: Joi.string(),
    author_position: Joi.string(),
    author_photo: Joi.string().default("/author/avatar.png"),
    is_expert: Joi.boolean().default(false),
    author_is_active: Joi.boolean().default(false),
    gender: Joi.string().valid("erkak", "ayol"),
    birth_date: Joi.date().less(new Date("2000-01-01")),
    birth_year: Joi.number().integer().min(1980).max(2005),
    referred: Joi.boolean().default(false),
    refferedDetails: Joi.string().when("referred", {
      is: true,
      then: Joi.string().required(),
      otherwise: Joi.string().optional(),
    }),
    conding_lang: Joi.array().items(Joi.string()),
    is_yes: Joi.boolean().truthy("YES").valid(true),
    author_token: Joi.string(),
  });
  return schema.validate(data, { abortEarly: false });
};
