const express = require("express");
const path = require("path");
const verifyOTPController = require("../controllers/verifyOTPController");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "..", "views", "OTP.html"));
});
router.post("/", verifyOTPController.verifyOTP);

module.exports = router;
