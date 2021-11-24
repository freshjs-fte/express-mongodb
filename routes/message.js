const msgRouter = require("express").Router();
const MessageController = require("../controllers/message");

/* Path - /api/users/messages */

msgRouter.get("/", (req, res, next) => {
  console.log(req.path);
  next()
}, MessageController.getAllMsgs);

msgRouter
  .route("/:userId")
  .get(MessageController.getAllMsgs)
  .post(MessageController.createMsg);

module.exports = msgRouter;
