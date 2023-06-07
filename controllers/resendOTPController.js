const jwt = require("jsonwebtoken");
const UsersDB = require("../models/User");
const UserOTPVerify = require("../models/UserOTPVerify");
const sendMail = require("../config/sendMail");

const handleResend = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.email) res.status(403);

  const userEmail = cookies.email;

  const OTP = Math.floor(Math.random() * 10000);

  const sentOTP = jwt.sign(
    {
      userEmail: userEmail,
      OTP: OTP,
    },
    process.env.OTP_KEY
  );

  const result = await UserOTPVerify.create({
    OTP: sentOTP,
  });

  console.log(result);
  sendMail(userEmail, sentOTP);
};

module.exports = { handleResend };
