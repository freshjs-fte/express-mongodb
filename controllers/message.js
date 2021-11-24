const { message: Message } = require("../models");

module.exports.getAllMsgs = async (req, res, next) => {
  console.log("test");
  try {
    
      filter.author = req.params.userId;
    }

    const msgs = await Message.find(filter)
      .limit(10)
      .sort({ createdAt: -1 })
      .populate("author");

    if (!msgs) {
      return res.status(404).send({ error: "Not Found" });
    }

    res.status(200).send(msgs);
  } catch (error) {
    next(error);
  }
};

module.exports.createMsg = async (req, res, next) => {
  try {
    const createdMsg = await Message.create({
      ...req.body,
      author: req.params.userId,
    });
    res.status(201).send(createdMsg);
  } catch (error) {
    next(error);
  }
};
