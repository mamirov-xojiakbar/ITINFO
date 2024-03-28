const mongoose = require("mongoose");
const Synonym = require("../schema/Synonym");

const getAllSynonym = async (req, res) => {
  try {
    const getSynonym = await Synonym.find({});
    res.status(200).send({ getSynonym });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const addSynonym = async (req, res) => {
  try {
    const { desc_id, dict_id } = req.body;

    const getSynonym = await Synonym({
      desc_id,
      dict_id,
    });
    await getSynonym.save();
    res.status(201).send({ message: "Synonym qo'shildi", getSynonym });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const updateSynonym = async (req, res) => {
  try {
    const { desc_id, dict_id } = req.body;
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const getSynonym = await Synonym.updateOne(
      { _id: req.params.id },
      {
        desc_id,
        dict_id,
      }
    );
    res.status(201).send({ getSynonym });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const getSynonymById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const getSynonym = await Synonym.findOne({ _id: req.params.id });
    res.status(200).send({ getSynonym });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const deleteSynonym = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const getSynonym = await Synonym.deleteOne({ _id: req.params.id });
    res.status(200).send({ getSynonym });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

module.exports = {
  getAllSynonym,
  addSynonym,
  updateSynonym,
  getSynonymById,
  deleteSynonym,
};
