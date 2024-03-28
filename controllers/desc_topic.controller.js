const mongoose = require("mongoose");
const Desc_topic = require("../schema/Desc_Topic");

const getAllDesc_topic = async (req, res) => {
  try {
    const getDesc_topic = await Desc_topic.find({});
    res.status(200).send({ getDesc_topic });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const addDesc_topic = async (req, res) => {
  try {
    const { desc_id, topic_id } = req.body;

    const getDesc_topic = await Desc_topic({
      desc_id,
      topic_id,
    });
    await getDesc_topic.save();
    res.status(201).send({ message: "Desc_topic qo'shildi", getDesc_topic });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const updateDesc_topic = async (req, res) => {
  try {
    const { desc_id, topic_id } = req.body;
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const getDesc_topic = await Desc_topic.updateOne(
      { _id: req.params.id },
      {
        desc_id,
        topic_id,
      }
    );
    res.status(201).send({ getDesc_topic });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const getDesc_topicById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const getDesc_topic = await Desc_topic.findOne({ _id: req.params.id });
    res.status(200).send({ getDesc_topic });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const deleteDesc_topic = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const getDesc_topic = await Desc_topic.deleteOne({ _id: req.params.id });
    res.status(200).send({ getDesc_topic });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

module.exports = {
  getAllDesc_topic,
  addDesc_topic,
  updateDesc_topic,
  getDesc_topicById,
  deleteDesc_topic,
};
