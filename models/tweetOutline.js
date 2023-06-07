const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TwetOutlineSchema = new Schema({
  header: {
    UserId: {
      type: String,
      required: true,
    },
    tweetId: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    comments: {
      type: Array,
      items: {
        type: String,
      },
    },
    likes: Number,
    shares: Number,
    retweets: Number,
    reactions: Number,
  },
  body: String,
});

module.exports = mongoose.model("Tweet", TwetOutlineSchema);
