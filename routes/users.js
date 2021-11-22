const userRouter = require("express").Router();
const msgRouter = require("./message");
const UserController = require("../controllers/user");

/* Path - /api/users */

/* User crud */
userRouter.get("/", UserController.getAllUsers);
userRouter.post("/", UserController.createUser);
userRouter.put("/:userId", UserController.updateUser);
userRouter.delete("/:userId", UserController.deleteUser);

/* Message crud */
userRouter.use("/messages", msgRouter);

module.exports = userRouter;
