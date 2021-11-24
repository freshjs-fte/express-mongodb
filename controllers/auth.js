const bcrypt = require("bcrypt");
const {
  bcrypt: { SALT_ROUNDS },
} = require("../configs");
const { user: User, token: Token } = require("../models");
const {
  createTokenPair,
  saveRefreshToken,
} = require("../services/jwt.service");

module.exports.registerUser = async (req, res, next) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    const createdUser = await User.create({
      ...req.body,
      password: passwordHash,
    });
    createdUser.password = undefined;

    // generate tokens
    const tokenPair = await createTokenPair(createdUser);
    // save refresh token
    saveRefreshToken(tokenPair.refreshToken, createdUser._id);

    // send tokens
    res.status(201).send({ tokenPair, data: createdUser });
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
    const tokenPair = await createTokenPair(createdUser);
    // save refresh token
    saveRefreshToken(tokenPair.refreshToken, createdUser._id);

    // send tokens
    res.status(200).send({ tokenPair, data: foundUser });
  } catch (error) {
    next(error);
  }
};

module.exports.refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    const foundToken = await Token.findOne({ value: refreshToken });
    if (!foundToken) {
      return res.status(404).send({ error: "Token not found" });
    }
    // verify token

    // generate tokens
    // save refresh token

    // send tokens
    res.status(200).send(foundUser);
  } catch (error) {
    // if token signature is not valid
    return res.status(400).send({ error: "Token not found" });
    next(error);
  }
};
