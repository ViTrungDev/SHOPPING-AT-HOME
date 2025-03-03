const mongoose = require("mongoose");

const ResetPassSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

module.exports = mongoose.model("ResetPass", ResetPassSchema);
