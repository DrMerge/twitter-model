const express = require("express");
const path = require("path");
const resendOTPController = require("../controllers/resendOTPController");
const router = express.Router();

router.get("/", resendOTPController.handleResend);

module.exports = router;
