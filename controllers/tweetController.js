const UsersDB = require("../models/User");
// const TweetsDB = require("../models/tweetOutline");
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const handleTweet = async (req, res) => {
  const userEmail = req.cookies.email;
  const tweet = req.body.tweet;

  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;

  try {
    const foundUser = await UsersDB.findOne({ email: userEmail }).exec();

    const id = foundUser._id.toString();

    foundUser.tweets.push({
      header: {
        tweetId: `${foundUser._id}:${uuid()}`,
        date: dateTime,
        comments: [],
        likes: "",
        shares: "",
        retweets: "",
        reactions: "",
      },
      body: tweet,
    });

    const result = await foundUser.save();
  } catch (err) {
    console.log(err);
  }
};

module.exports = { handleTweet };
