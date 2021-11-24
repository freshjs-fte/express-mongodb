const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../configs");
const { user: User } = require("../models");

module.exports.registerUser = async (req, res, next) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    const createdUser = await User.create({
      ...req.body,
      password: passwordHash,
    });
    createdUser.password = undefined;

    // generate tokens

    res.status(201).send(createdUser);
  } catch (error) {
    next(error);
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) {
      return res.status(404).send({ error: "User not found" });
    }
    const verdict = await bcrypt.compare(req.body.password, foundUser.password);
    if (!verdict) {
      return res.status(401).send({ error: "Invalid login or password" });
    }
    foundUser.password = undefined;

    // generate tokens

    res.status(200).send(foundUser);
  } catch (error) {
    next(error);
  }
};
