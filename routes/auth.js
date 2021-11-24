const authRouter = require("express").Router();
const UserController = require("../controllers/user");

authRouter.post("/register", UserController.createUser);
authRouter.post("/login", UserController.loginUser);

module.exports = authRouter;
