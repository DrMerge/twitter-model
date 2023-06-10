const UsersDB = require("../models/User");

const getUserID = async (inputEmail) => {
  const foundUser = await UsersDB.findOne({ email: inputEmail }).exec();

  if (!foundUser) return null;

  const username = foundUser.username;

  const ID = foundUser._id;

  return ID;
};

module.exports = getUserID;
