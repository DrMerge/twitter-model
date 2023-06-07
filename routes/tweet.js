const express = require("express");
const path = require("path");
const tweetController = require("../controllers/tweetController");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "..", "views", "tweet.html"));
});
router.post("/", tweetController.handleTweet);

module.exports = router;
