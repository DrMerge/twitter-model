const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UsersDB = require("../models/User");
const cookieParser = require("cookie-parser");

const handleAuth = async (req, res) => {
  const { username, password, email } = req.body;

  const foundUser =
    (await UsersDB.findOne({ username: username })) ||
    (await UsersDB.findOne({ email: email }));

  if (!foundUser) res.status(401).json({ message: "User not found" });

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) return res.status(401).json({ message: "Password is incorrect" });

  const accessToken = jwt.sign(
    (userInfo = {
      username: foundUser.username,
      email: foundUser.email,
    }),
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "600s" }
  );
  const refreshToken = jwt.sign(
    (userInfo = {
      username: foundUser.username,
      email: foundUser.email,
    }),
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "2d" }
  );

  foundUser.refreshToken = refreshToken;
  const result = await foundUser.save();

  console.log(result);

  res
    .cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",

      maxAge: 24 * 60 * 60 * 1000,
    })
    .json({ accessToken });
};
