const rootRouter = require("express").Router();
const authRouter = require("./auth");
const userRouter = require("./users");
const MessageController = require("../controllers/message");
const { checkAccessToken } = require("../middlewares/tokenCheck.mw");

rootRouter.use("/auth", authRouter);
rootRouter.use("/users", checkAccessToken, userRouter);
rootRouter.get("/messages", checkAccessToken, MessageController.getAllMsgs);

module.exports = rootRouter;
