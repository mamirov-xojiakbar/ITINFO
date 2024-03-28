const mongoose = require("mongoose");
const Social = require("../schema/Social");

const getAllSocial = async (req, res) => {
  try {
    const getSocial = await Social.find({});
    res.status(200).send({ getSocial });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const addSocial = async (req, res) => {
  try {
    const { social_name, social_icon_file } = req.body;

    const getSocial = await Social({
      social_name,
      social_icon_file,
    });
    await getSocial.save();
    res.status(201).send({ message: "Social qo'shildi", getSocial });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const updateSocial = async (req, res) => {
  try {
    const { social_name, social_icon_file } = req.body;
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const getSocial = await Social.updateOne(
      { _id: req.params.id },
      {
        social_name,
        social_icon_file,
      }
    );
    res.status(201).send({ getSocial });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const getSocialById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const getSocial = await Social.findOne({ _id: req.params.id });
    res.status(200).send({ getSocial });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const deleteSocial = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const getSocial = await Social.deleteOne({ _id: req.params.id });
    res.status(200).send({ getSocial });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

module.exports = {
  getAllSocial,
  addSocial,
  updateSocial,
  getSocialById,
  deleteSocial,
};
