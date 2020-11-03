let mongoose = require("mongoose");

const interviewSchema = mongoose.Schema({
  start: {
    type: Date,
    required: true,
    default: Date.now,
  },
  end: {
    type: {
      type: Date,
      required: false,
    },
  },
  partner_nickname: {
    type: String,
    required: true,
  },
});

const profileSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  interviews: [interviewSchema],
});

module.exports = mongoose.model("profile", profileSchema);
