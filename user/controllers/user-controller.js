let User = require('../models/user-model');
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
        data: users
      });
    }
  });
};
// Handle create user actions
exports.new = function (req, res) {
  let user = new User();
  user.email = req.body.email;
  user.password = req.body.password;
  user.nickname = req.body.nickname;
  // save the user and check for errors
  user.save(function (err) {
    if (err) {
      res.status(500).json({
        status: 'error',
        message: err
      });
    } else {
      res.status(200).json({
        status: 'success',
        message: 'New user created!',
        data: user
      });
    }
  });
};

// Handle view user info
exports.view = function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) {
      res.status(404).send({
        status: 'error',
        message: 'Not Found'
      });
    } else {
      res.json({
        status: 'success',
        message: 'User details successfully retrieved',
        data: user
      });
    }
  });
};

exports.login = function (req, res) {
  User.findOne({email: req.params.email, password: req.body.password}, (err, user) => {
    if (err || !user) {
      res.status(404).json({
        status: 'error',
        message: 'No user found matching login credentials'
      });
    } else {
      res.status(200).json({
        status: 'success',
        message: 'Successfully logged in',
        data: user
      });
    }
  })
}

// Handle update user info
exports.update = function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) {
      res.status(404).send({
        status: 'error',
        message: 'Not Found'
      });
    } else {
      user.email = req.body.email ? req.body.email : user.email;
      user.password = req.body.password ? req.body.password : user.password;
      user.nickname = req.body.nickname ? req.body.nickname : user.nickname;
      user.save(function (err) {
        if (err)
          res.json({
            status: 'error',
            message: err
          });
        res.json({
          status: 'success',
          message: 'User Info updated',
          data: user
        });
      });
    }
  });
};
// Handle delete user
exports.delete = function (req, res) {
  User.remove({
    _id: req.params.user_id
  }, function (err, user) {
    if (err) {
      res.status(404).send({
        status: 'error',
        message: err
      });
    } else {
      res.json({
        status: "success",
        message: 'User deleted'
      });
    }
  });
};