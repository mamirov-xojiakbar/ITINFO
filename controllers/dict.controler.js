const { errorHandler } = require("../helpers/error_hendler");
const Dictionary = require("../schema/Dictionary");

const addTerm = async (req, res) => {
  try {
    const { term } = req.body;
    const dict = await Dictionary.findOne({
      term: { $regex: term, $options: "i" },
    });
    if (dict) {
      return res.status(400).send({ message: "Bunday terim avval kiritilgan" });
    }
    const newTerm = await Dictionary({
      term,
      letter: term[0],
    });
    await newTerm.save();
    res.status(200).send({ message: "Yangi termin qo'shildi" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getByTermLetter = async (req, res) => {
  try {
    const getTerm = await Dictionary.find({
      letter: req.params.letter,
    });
    if (!getTerm) {
      return res.status(404).send({ message: "Bunday terim yo'q" });
    }
    res.status(200).send({ getTerm });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAllTerm = async (req, res) => {
  try {
    const getTerm = await Dictionary.find({});
    res.status(200).send({ getTerm });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getTerm = async (req, res) => {
  try {
    const getTerm = await Dictionary.find({ term: req.params.term });
    res.status(200).send({ getTerm });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addTerm,
  getByTermLetter,
  getAllTerm,
  getTerm,
};
