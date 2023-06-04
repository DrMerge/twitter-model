const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserOTPSchema = new Schema({
  OTP: String,
  expiresAt: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});

module.exports = mongoose.model("UserOTP", UserOTPSchema);
