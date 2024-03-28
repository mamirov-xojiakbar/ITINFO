const mongoose = require("mongoose");
const Tag = require("../schema/Tag");

const getAllTag = async (req, res) => {
  try {
    const getTag = await Tag.find({});
    res.status(200).send({ getTag });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const addTag = async (req, res) => {
  try {
    const { topic_id, category_id } = req.body;

    const getTag = await Tag({
      topic_id,
      category_id,
    });
    await getTag.save();
    res.status(201).send({ message: "Tag qo'shildi", getTag });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const updateTag = async (req, res) => {
  try {
    const { topic_id, category_id } = req.body;
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const getTag = await Tag.updateOne(
      { _id: req.params.id },
      {
        topic_id,
        category_id,
      }
    );
    res.status(201).send({ getTag });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const getTagById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const getTag = await Tag.findOne({ _id: req.params.id });
    res.status(200).send({ getTag });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const deleteTag = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const getTag = await Tag.deleteOne({ _id: req.params.id });
    res.status(200).send({ getTag });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

module.exports = {
  getAllTag,
  addTag,
  updateTag,
  getTagById,
  deleteTag,
};
