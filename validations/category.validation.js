const Joi = require("joi");

exports.categoryValidation = (data) => {
  const schema = Joi.object({
    category_name: Joi.string()
      .min(2)
      .message("Kategory nomi 2 ta harfdan uzun bolishi kere")
      .max(100)
      .message("Kategory nomi 100 ta harfdan kam bolishi kere")
      .required(),

    parent_category_id: Joi.string().alphanum().message("ID noto'g'ri"),
  });
  return schema.validate(data, { abortEarly: false });
};
