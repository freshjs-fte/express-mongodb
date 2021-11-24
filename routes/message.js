const msgRouter = require("express").Router();
const MessageController = require("../controllers/message");

/* Path - /api/users/messages */

msgRouter.get("/", MessageController.getAllMsgs);

msgRouter
  .route("/:userId")
  .get(checkAccessToken, MessageController.getAllMsgs)
  .post(checkAccessToken, MessageController.createMsg);

module.exports = msgRouter;
