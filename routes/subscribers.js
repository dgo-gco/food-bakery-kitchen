const subscriberRouter = require("express").Router();
const {
  getAllSubscribers,
  createSubscribers,
  getSubscriberById,
  editSubscriber,
  deleteSubscriber,
} = require("../controllers/subscriberController");

subscriberRouter.get("/all", getAllSubscribers);
subscriberRouter.post("/create", createSubscribers);
subscriberRouter.get("/:id", getSubscriberById);
subscriberRouter.put("/:id/update", editSubscriber);
subscriberRouter.delete("/:id/delete", deleteSubscriber);

module.exports = subscriberRouter;
