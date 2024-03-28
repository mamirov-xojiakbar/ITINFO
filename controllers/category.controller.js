const category = require("../schema/Category");
const mongoose = require("mongoose");
const Joi = require("joi");
const { categoryValidation } = require("../validations/category.validation");

const getAllCategory = async (req, res) => {
  try {
    const getCategory = await category.find({});
    res.status(200).send({ getCategory });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const addCategory = async (req, res) => {
  try {
    const { error, value } = categoryValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }

    const { category_name, parent_category_id } = value;

    const getCategory = await category({
      category_name,
      parent_category_id,
    });
    await getCategory.save();
    res.status(201).send({ message: "Category qo'shildi", getCategory });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { category_name, parent_category_id } = req.body;
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const getCategory = await category.updateOne(
      { _id: req.params.id },
      {
        category_name,
        parent_category_id,
      }
    );
    res.status(201).send({ getCategory });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const getCategoryById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const getCategory = await category.findOne({ _id: req.params.id });
    res.status(200).send({ getCategory });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const deleteCategory = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const getCategory = await category.deleteOne({ _id: req.params.id });
    res.status(200).send({ getCategory });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

module.exports = {
  getAllCategory,
  addCategory,
  updateCategory,
  getCategoryById,
  deleteCategory,
};
