const jwt = require("jsonwebtoken");
const { token: Token } = require("../models");
const { JWT_REFRESH_SECRET, JWT_ACCESS_SECRET, JWT_ACCESS_TIME } = process.env;

module.exports.veryfyRefreshToken = async (token) => {
  return jwt.verify(token, JWT_REFRESH_SECRET);
};

module.exports.veryfyAccessToken = async (token) => {
  return jwt.verify(token, JWT_ACCESS_SECRET);
};

/* create tokens */
module.exports.createTokenPair = async (data) => {
  const accessToken = jwt.sign(data, JWT_ACCESS_SECRET, {
    expiresIn: JWT_ACCESS_TIME,
  });
  const refreshToken = jwt.sign(data, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_TIME,
  });

  return { accessToken, refreshToken };
};

/* save refresh token to DB */
module.exports.saveRefreshToken = async (token, userId) => {
  return await Token.create({ value: token, user: userId });
};
