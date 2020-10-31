let mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
});

let User = (module.exports = mongoose.model("user", userSchema));
module.exports.get = function (callback, limit) {
  User.find({}, "email nickname", {}, callback).limit(limit);
};
