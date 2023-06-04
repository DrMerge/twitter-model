const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fsPromise = require("fs").promises;
const path = require("path");
const UsersDB = require("../models/User");
const UserOTPVerify = require("../models/UserOTPVerify");
const sendMail = require("../config/sendMail");

const handleRegister = async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !email || !password)
    return res
      .status(409)
      .json({ message: "Please provide all required fields" });

  const duplicate =
    (await UsersDB.findOne({ username: username }).exec()) &&
    (await UsersDB.findOne({ email: email }).exec());

  if (duplicate)
    return res.status(409).json({ message: "User already exists" });

  const hashedPwd = await bcrypt.hash(password, 10);

  const result = await UsersDB.create({
    username: username,
    email: email,
    password: hashedPwd,
    refreshToken: "",
  });

  console.log(result);
  const OTP = Math.floor(Math.random() * 10000);
  OTP.toString();

  const sentOTP = jwt.sign(
    {
      userEmail: email,
      OTP: OTP,
    },
    process.env.OTP_KEY
  );

  const result2 = await UserOTPVerify.create({
    OTP: sentOTP,
  });

  console.log(result2);
  //   sendMail(email, sentOTP);
  res.status(200).redirect("http://localhost:7000/otp");
};

module.exports = { handleRegister };
