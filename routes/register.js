const express = require("express");
const path = require("path");
const registerController = require("../controllers/registerController");
const router = express.Router();

router.get("/", (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, "..", "views", "register.html"));
});
router.post("/", registerController.handleRegister);

module.exports = router;
