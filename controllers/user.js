const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../configs");
const { user: User } = require("../models");

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    next(error);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, SALT_ROUNDS);

    const createdUser = await User.create({
      ...req.body,
      password: passwordHash,
    });

    createdUser.password = undefined;

    res.status(201).send(createdUser);
  } catch (error) {
    next(error);
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });

    const verdict = await bcrypt.compare(req.body.password, foundUser.password);

    if (!verdict) {
      return res.status(401).send({ error: "Invalid login or password" });
    }

    foundUser.password = undefined;

    res.status(200).send(foundUser);
  } catch (error) {
    next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { ...req.body },
      { returnDocument: "after" }
    );
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      return res.status(404).send({ error: "User not found" });
    }

    res
      .status(200)
      .send({ data: deletedUser, meta: { userId: req.params.userId } });
  } catch (error) {
    next(error);
  }
};
