const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 6,
      max_length: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      max_length: 255,
    },
    email: {
      type: String,
      required: true,
      minlength: 6,
      max_length: 255,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      minlength: 10,
      max_length: 255,
    },
    surname: {
      type: String,
      required: true,
      minlength: 2,
      max_length: 255,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", UserSchema);
