const jwt = require("jsonwebtoken");
const UsersDB = require("../models/User");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) return res.status(401);

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403);

    req.user = decoded.userInfo.username;
    req.email = decoded.userInfo.email;
  });
};
