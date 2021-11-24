const authRouter = require("express").Router();
const AuthController = require("../controllers/auth");

authRouter.post("/register", AuthController.registerUser);
authRouter.post("/login", AuthController.loginUser);

module.exports = authRouter;
