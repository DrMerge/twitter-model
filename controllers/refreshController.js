const jwt = require("jsonwebtoken");
const UsersDB = require("../models/User");

const handleRefresh = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(409).send();

  const refreshToken = cookies.jwt;
  try {
    const foundUser = await UsersDB.findOne({ refreshToken }).exec();

    if (!foundUser) return res.status(401).send();

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.status(403).send();

        const accessToken = jwt.sign(
          (userInfo = {
            username: foundUser.username,
            email: foundUser.email,
          }),
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "600s" }
        );

        res.cookie("email", foundUser.email).json({ accessToken });
      }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = { handleRefresh };
