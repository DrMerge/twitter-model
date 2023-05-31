const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UsersDB = require("../models/User");
const sendMail = require("../config/sendMail");
const handleRegister = async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !email || !password)
    return res
      .status(409)
      .json({ message: "Please provide all required fields" });

  const duplicate =
    (await UsersDB.findOne({ username: username }).exec()) ||
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
  sendMail(email, "Omo this on tough");
};

module.exports = { handleRegister };
