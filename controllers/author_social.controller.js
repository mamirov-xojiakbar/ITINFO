const mongoose = require("mongoose");
const Author_social = require("../schema/Author_Social");

const getAllAuthor_social = async (req, res) => {
  try {
    const getAuthor_social = await Author_social.find({});
    res.status(200).send({ getAuthor_social });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const addAuthor_social = async (req, res) => {
  try {
    const { author_id, social_id, social_link } = req.body;

    const getAuthor_social = await Author_social({
      author_id,
      social_id,
      social_link,
    });
    await getAuthor_social.save();
    res
      .status(201)
      .send({ message: "Author_social qo'shildi", getAuthor_social });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const updateAuthor_social = async (req, res) => {
  try {
    const { author_id, social_id, social_link } = req.body;
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const getAuthor_social = await Author_social.updateOne(
      { _id: req.params.id },
      {
        author_id,
        social_id,
        social_link,
      }
    );
    res.status(201).send({ getAuthor_social });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const getAuthor_socialById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const getAuthor_social = await Author_social.findOne({
      _id: req.params.id,
    });
    res.status(200).send({ getAuthor_social });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const deleteAuthor_social = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const getAuthor_social = await Author_social.deleteOne({
      _id: req.params.id,
    });
    res.status(200).send({ getAuthor_social });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

module.exports = {
  getAllAuthor_social,
  addAuthor_social,
  updateAuthor_social,
  getAuthor_socialById,
  deleteAuthor_social,
};
