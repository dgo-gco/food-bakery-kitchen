const Subscriber = require("../models/subscriberModel");

const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find({}).populate('courses')
    return res.status(200).send({
      msg: "Here you have all the subscribers:",
      subscribers,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const createSubscribers = async (req, res) => {
  try {
    const { name, email, zipCode, courses } = req.body;
    if (!(name || email || zipCode || courses)) {
      return res.status(200).send({
        msg: "All fields are required",
      });
    }

    let subscriber = await Subscriber.create({
      name,
      email,
      zipCode,
      courses,
    });

    return res.status(200).send({
      msg: "subscriber successfully created",
      subscriber,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const getSubscriberById = async (req, res) => {
  try {
    const { id } = req.params;
    const subscriber = await Subscriber.findById(id);
    if (!subscriber) {
      return res.status(200).send({
        msg: "subscriber not registered",
      });
    }
    return res.status(200).send({
      msg: "subscriber found:",
      subscriber,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const editSubscriber = async (req, res) => {
  try {
    const { id } = req.params;
    const subscriber = await Subscriber.findByIdAndUpdate(id, req.body);
    if (!subscriber) {
      return res.status(200).send({
        msg: "subscriber not registered",
      });
    }
    return res.status(200).send({
      msg: "subscriber found:",
      subscriber,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const deleteSubscriber = async (req, res) => {
  try {
    const { id } = req.params;
    const subscriber = await Subscriber.findByIdAndDelete(id);
    if (!subscriber) {
      return res.status(200).send({
        msg: "subscriber not registered",
      });
    }
    return res.status(200).send({
      msg: "subscriber deleted:",
      subscriber,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
  getAllSubscribers,
  createSubscribers,
  getSubscriberById,
  editSubscriber,
  deleteSubscriber,
};
