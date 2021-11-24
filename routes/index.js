const rootRouter = require("express").Router();
const authRouter = require("./auth");
const userRouter = require("./users");

rootRouter.use("/users", userRouter);
rootRouter.use("/auth", authRouter);

module.exports = rootRouter;
