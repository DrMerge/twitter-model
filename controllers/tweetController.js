const UsersDB = require("../models/User");
const TweetsDB = require("../models/tweetOutline");
const { format } = require("date-fns");

const handleTweet = async (req, res) => {
  const userEmail = req.cookies.email;
  const tweet = req.body.tweet;

  console.log(tweet);
  console.log(userEmail);
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const foundUser = await UsersDB.findOne({ email: userEmail }).exec();
  const result = await TweetsDB.create({
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
