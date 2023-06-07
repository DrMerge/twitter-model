const UsersDB = require("../models/User");
const TweetsDB = require("../models/tweetOutline");
const { format } = require("date-fns");

const handleTweet = async (req, res) => {
  const tweet = req.body.tweet;
  console.log(req);
  //   console.log(tweet);
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;

  const result = TweetsDB.create({
    header: {
      UserId: "1",
      tweetId: "1",
      date: dateTime,
      comments: [],
      likes: "",
      shares: "",
      retweets: "",
      reactions: "",
    },
    body: tweet,
  });
};

module.exports = { handleTweet };
