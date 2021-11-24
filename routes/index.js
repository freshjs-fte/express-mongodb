const rootRouter = require("express").Router();
const authRouter = require("./auth");
const userRouter = require("./users");
const MessageController = require("../controllers/message");

rootRouter.use("/users", userRouter);
rootRouter.use("/auth", authRouter);
rootRouter.get("/messages", MessageController.getAllMsgs );


module.exports = rootRouter;
