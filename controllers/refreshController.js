const jwt = require("jsonwebtoken");
const UsersDB = require("../models/User");

const handleRefresh = async (req, res) => {
  const cookies = res.cookies;
  if (!cookies?.jwt) return res.status(401);

  const refreshToken = cookies.jwt;

  const foundUser = await UsersDB.findOne({
    refreshToken: refreshToken,
  }).exec();

  if (!foundUser) return res.status(401);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (req, res) => {
    if (err) return res.status(403);

    const accessToken = jwt.sign(
      (userInfo = {
        username: foundUser.username,
        email: foundUser.email,
      }),
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "600s" }
    );
  });
};

module.exports = { handleRefresh };
