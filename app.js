const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes");
const mongoose = require("mongoose");

/* app */
const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  // res.status(200).send("Hello, world!");
  next()
});

app.use("/api", rootRouter);

app.use((err, req, res, next) => {
  let status = 400;
  // if (/validation failed/.test(err.messsage)) {
  if (err instanceof mongoose.Error.ValidationError) {
    status = 400;
  }
  if (err instanceof mongoose.Error.MissingSchemaError) {
    status = 500;
  }
  res.status(status).send({ error: err.message }); // VERY BAD error handler
});

module.exports = app;
