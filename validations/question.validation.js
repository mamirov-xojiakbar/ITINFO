const Joi = require("joi");

exports.quesionValidate = (data) => {
  const schema = Joi.object({
    question: Joi.string(),
    answer: Joi.string(),
    created_date: Joi.date(),
    updated_date: Joi.date(),
    is_chaked: Joi.string(),
    user_id: Joi.string(),
    expert_id: Joi.string(),
  });
  return schema.validate(data, { abortEarly: false });
};
