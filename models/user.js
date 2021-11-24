const { model, Schema } = require("mongoose");

const userShema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "Moder", "Member"],
      required: true,
    },
    isMale: {
      type: Boolean,
      required: true,
    },
    birthday: {
      type: Date,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("users", userShema);
