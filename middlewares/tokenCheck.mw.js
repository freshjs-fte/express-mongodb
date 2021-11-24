const { veryfyAccessToken } = require("../services/jwt.service");

module.exports.checkAccessToken = (req, res, next) => {
  try {
    const [type, token] = req.headers.authorization.split(" ");

    if (!type || type !== "Bearer" || !token) {
      next(new Error("Need token"));
    }

    req.userData = await veryfyAccessToken(token);
    next();
  } catch (err) {
    res.status(403).send({ error: "Not authorized" });
  }
};
