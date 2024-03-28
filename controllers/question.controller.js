const mongoose = require("mongoose");
const Joi = require("joi");
const { questionValidation } = require("../validations/question.validation");
const Question_Answer = require("../schema/Question_Answer");

const getAllQuestion = async (req, res) => {
  try {
    const getQuestion = await Question_Answer.find({});
    res.status(200).send({ getQuestion });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const addQuestion = async (req, res) => {
  try {
    const { error, value } = questionValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }

    const {
      question,
      answer,
      created_date,
      updated_date,
      is_chaked,
      user_id,
      expert_id,
    } = value;

    const getQuestion = await Question_Answer({
      question,
      answer,
      created_date,
      updated_date,
      is_chaked,
      user_id,
      expert_id,
    });
    await getQuestion.save();
    res.status(201).send({ message: "Question qo'shildi", getQuestion });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const updateQuestion = async (req, res) => {
  try {
    const {
      question,
      answer,
      created_date,
      updated_date,
      is_chaked,
      user_id,
      expert_id,
    } = req.body;
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const getQuestion = await question.Question_Answer(
      { _id: req.params.id },
      {
        question,
        answer,
        created_date,
        updated_date,
        is_chaked,
        user_id,
        expert_id,
      }
    );
    res.status(201).send({ getQuestion });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const getQuestionById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const getQuestion = await Question_Answer.findOne({ _id: req.params.id });
    res.status(200).send({ getQuestion });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const getQuestion = await Question_Answer.deleteOne({ _id: req.params.id });
    res.status(200).send({ getQuestion });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

module.exports = {
  getAllQuestion,
  addQuestion,
  updateQuestion,
  getQuestionById,
  deleteQuestion,
};
