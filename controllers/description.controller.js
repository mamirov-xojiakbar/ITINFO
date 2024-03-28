const mongoose = require("mongoose");
const Description = require("../schema/Description");

const getAllDescription = async (req, res) => {
  try {
    const getDescription = await Description.find({});
    res.status(200).send({ getDescription });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const addDescription = async (req, res) => {
  try {
    const { category_id, description } = req.body;

    const getDescription = await Description({
      category_id,
      description,
    });
    await getDescription.save();
    res.status(201).send({ message: "Description qo'shildi", getDescription });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const updateDescription = async (req, res) => {
  try {
    const { category_id, description } = req.body;
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const getDescription = await Description.updateOne(
      { _id: req.params.id },
      {
        category_id,
        description,
      }
    );
    res.status(201).send({ getDescription });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const getDescriptionById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const getDescription = await Description.findOne({ _id: req.params.id });
    res.status(200).send({ getDescription });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const deleteDescription = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const getDescription = await Description.deleteOne({ _id: req.params.id });
    res.status(200).send({ getDescription });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

module.exports = {
  getAllDescription,
  addDescription,
  updateDescription,
  getDescriptionById,
  deleteDescription,
};
