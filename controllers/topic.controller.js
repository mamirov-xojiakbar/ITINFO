const mongoose = require("mongoose");
const Topic = require("../schema/Topic");

const getAllTopic = async (req, res) => {
  try {
    const getTopic = await Topic.find({});
    res.status(200).send({ getTopic });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const addTopic = async (req, res) => {
  try {
    const {
      author_id,
      topic_title,
      topic_text,
      created_date,
      updated_date,
      is_chaked,
      is_approved,
      expert_id,
    } = req.body;

    const getTopic = await Topic({
      author_id,
      topic_title,
      topic_text,
      created_date,
      updated_date,
      is_chaked,
      is_approved,
      expert_id,
    });
    await getTopic.save();
    res.status(201).send({ message: "Topic qo'shildi", getTopic });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const updateTopic = async (req, res) => {
  try {
    const {
      author_id,
      topic_title,
      topic_text,
      created_date,
      updated_date,
      is_chaked,
      is_approved,
      expert_id,
    } = req.body;
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const getTopic = await Topic.updateOne(
      { _id: req.params.id },
      {
        author_id,
        topic_title,
        topic_text,
        created_date,
        updated_date,
        is_chaked,
        is_approved,
        expert_id,
      }
    );
    res.status(201).send({ getTopic });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const getTopicById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const getTopic = await Topic.findOne({ _id: req.params.id });
    res.status(200).send({ getTopic });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const deleteTopic = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const getTopic = await Topic.deleteOne({ _id: req.params.id });
    res.status(200).send({ getTopic });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

module.exports = {
  getAllTopic,
  addTopic,
  updateTopic,
  getTopicById,
  deleteTopic,
};
