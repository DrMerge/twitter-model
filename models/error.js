const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const errorSchema = new Schema({
  id: {
    type: String,
    required: true,
  },

  errorMessage: String,
});

module.exports = mongoose.model("Error", errorSchema);
