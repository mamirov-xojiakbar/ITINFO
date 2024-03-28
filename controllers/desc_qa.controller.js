const mongoose = require("mongoose");
const Desc_QA = require("../schema/Desc_QA");

const getAllDesc_qa = async (req, res) => {
  try {
    const getDesc_qa = await Desc_QA.find({});
    res.status(200).send({ getDesc_qa });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const addDesc_qa = async (req, res) => {
  try {
    const { qa_id, desc_id } = req.body;

    const getDesc_qa = await Desc_QA({
      qa_id,
      desc_id,
    });
    await getDesc_qa.save();
    res.status(201).send({ message: "Desc_qa qo'shildi", getDesc_qa });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const updateDesc_qa = async (req, res) => {
  try {
    const { qa_id, desc_id } = req.body;
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const getDesc_qa = await Desc_QA.updateOne(
      { _id: req.params.id },
      {
        qa_id,
        desc_id,
      }
    );
    res.status(201).send({ getDesc_qa });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const getDesc_qaById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const getDesc_qa = await Desc_QA.findOne({ _id: req.params.id });
    res.status(200).send({ getDesc_qa });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

const deleteDesc_qa = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Incorect ID" });
    }
    const getDesc_qa = await Desc_QA.deleteOne({ _id: req.params.id });
    res.status(200).send({ getDesc_qa });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: "Serverda xatolik", error });
  }
};

module.exports = {
  getAllDesc_qa,
  addDesc_qa,
  updateDesc_qa,
  getDesc_qaById,
  deleteDesc_qa,
};
