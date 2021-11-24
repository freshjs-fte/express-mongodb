const {
  env: {
    JWT_ACCESS_TIME,
    JWT_ACCESS_TIME,
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
  },
} = process;

module.exports = {
  PORT: 5000,

  bcrypt: {
    SALT_ROUNDS: 3,
  },
  // object
  JWT_ACCESS_TIME,
  JWT_ACCESS_TIME,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
};
