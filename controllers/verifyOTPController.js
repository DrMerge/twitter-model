const fsPromise = require("fs").promises;
const fs = require("fs");
const path = require("path");
const UsersDB = require("../models/User");
const OTP = fs.readFileSync(
  path.join(__dirname, "..", "Temp", "OTP.txt"),
  "utf8"
);
const verifyOTP = async (req, res) => {
  const { providedOTP, username } = req.body;

  const foundUser = await UsersDB.findOne({ username: username }).exec();

  if (!foundUser || OTP != providedOTP)
    return res.status(409).json({ message: "OTP PROVIDED NOT CORRECT" });

  foundUser.userEmailConfirmed = true;

  const result = await foundUser.save();

  res.status(204).sendFile("../views/login.html");
};

module.exports = { verifyOTP };
