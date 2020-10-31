const User = require("../models/user-model");
const Profile = require("../models/profile-model");
const fetch = require("node-fetch");
// Handle index actions
exports.index = function (req, res) {
  User.get(function (err, users) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    } else {
      res.json({
        status: "success",
        message: "Users retrieved successfully",
        data: users,
      });
    }
  });
};
// Handle create user actions
exports.new = function (req, res) {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    nickname: req.body.nickname,
  });
  const profile = new Profile({ user_id: user._id });
  // save the user and check for errors
  user.save(function (err) {
    if (err) {
      res.status(500).json({
        status: "error",
        message: err,
      });
    } else {
      // Save profile
      profile.save(function (err) {
        if (err) {
          res.status(500).json({
            status: "error",
            message: err,
          });
        } else {
          res.status(200).json({
            status: "success",
            message: "New user created!",
            data: user,
          });
        }
      });
      /* Create match elo
      const MATCH_URL =
        "http://match-service.ipp.svc.cluster.local:5000/match/create";
      fetch(`${MATCH_URL}?email=${user.email}&nickname=${user.nickname}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.status) {
            res.status(200).json({
              status: "success",
              message: "New user created!",
              data: user,
            });
          } else {
            res.status(500).json({
              status: "error",
              message: "Error initialising match elo, please try again",
              data: result.message,
            });
          }
        });*/
    }
  });
};

// Handle view user info
exports.view = function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) {
      res.status(404).send({
        status: "error",
        message: "Not Found",
      });
    } else {
      res.json({
        status: "success",
        message: "User details successfully retrieved",
        data: user,
      });
    }
  });
};

exports.login = function (req, res) {
  User.findOne(
    { email: req.params.email, password: req.body.password },
    "email nickname",
    (err, user) => {
      if (err || !user) {
        res.status(404).json({
          status: "error",
          message: "No user found matching login credentials",
        });
      } else {
        res.status(200).json({
          status: "success",
          message: "Successfully logged in",
          data: user,
        });
      }
    }
  );
};

// Handle update user info
exports.update = function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) {
      res.status(404).send({
        status: "error",
        message: "Not Found",
      });
    } else {
      user.email = req.body.email ? req.body.email : user.email;
      user.password = req.body.password ? req.body.password : user.password;
      user.nickname = req.body.nickname ? req.body.nickname : user.nickname;
      user.save(function (err) {
        if (err)
          res.json({
            status: "error",
            message: err,
          });
        res.json({
          status: "success",
          message: "User Info updated",
          data: user,
        });
      });
    }
  });
};
// Handle delete user
exports.delete = function (req, res) {
  User.remove(
    {
      _id: req.params.user_id,
    },
    function (err, user) {
      if (err) {
        res.status(404).send({
          status: "error",
          message: err,
        });
      } else {
        res.json({
          status: "success",
          message: "User deleted",
        });
      }
    }
  );
};
