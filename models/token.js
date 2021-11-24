const { model, Schema } = require("mongoose");

const messageShema = new Schema(
  {
    value: {
      type: Schema.Types.String,
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("tokens", messageShema);
