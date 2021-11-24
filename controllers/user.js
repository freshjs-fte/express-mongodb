const { user: User } = require("../models");

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) {
      res.status(404).send({ error: "Users not found" });
    }
    res.status(200).send({ data: users });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.param.userId);

    if (!user) {
      res.status(404).send({ error: "User not found" });
    }

    res.status(200).send({ data: user });
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
