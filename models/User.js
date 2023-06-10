const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TwetOutlineSchema = new Schema({
  header: {
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

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: String,
  userEmailConfirmed: {
    type: Boolean,
    default: false,
  },
  tweets: [TwetOutlineSchema],
});

module.exports = mongoose.model("User", UserSchema);
