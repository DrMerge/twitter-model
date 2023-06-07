const UsersDB = require("../models/User");
const UserOTPVerify = require("../models/UserOTPVerify");

const jwt = require("jsonwebtoken");

const verifyOTP = async (req, res) => {
  const providedOTP = req.body.value;

  if (!providedOTP)
    return res.status(400).json({ message: "Please enter an OTP" });
  console.log(providedOTP);

  const foundOTP = await UserOTPVerify.findOne({ OTP: providedOTP }).exec();

  if (!foundOTP)
    return res.status(409).json({ message: "Please enter a valid OTP" });
  console.log("foundOTP");

  jwt.verify(req.body.value, process.env.OTP_KEY, async (err, decoded) => {
    if (err) return res.sendStatus(403); // invalid token

    const foundEmail = decoded.userEmail;
    const OTP = decoded.OTP;
    console.log(foundEmail);

    const foundUser = await UsersDB.findOne({ email: foundEmail }).exec();
    if (!foundUser)
      return res.status(400).json({ message: "Bad or faulty OTP" });

    foundUser.userEmailConfirmed = true;

    const result = await foundUser.save();

    console.log(result);

    res.status(200).redirect("http://localhost:7000/auth");
  });
};

module.exports = { verifyOTP };
