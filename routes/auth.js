const express = require("express");
const path = require("path");
const authController = require("../controllers/authController");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "..", "views", "login.html"));
});

router.post("/", authController.handleAuth);

module.exports = router;
