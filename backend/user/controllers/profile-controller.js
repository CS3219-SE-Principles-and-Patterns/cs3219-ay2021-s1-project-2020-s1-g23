const Profile = require("../models/profile-model");

exports.get = function (req, res) {
  Profile.findOne({ user_id: req.params.user_id }, (err, profile) => {
    if (err || !profile) {
      res.status(404).json({
        status: "error",
        message: "No profile found matching user id",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Profile details retrieved successfully!",
        data: profile,
      });
    }
  });
};

exports.startInterview = function (req, res) {
  Profile.findOne({ user_id: req.params.user_id }, (err, profile) => {
    if (err) {
      res.status(500).json({
        status: "error",
        message:
          "This error should not have occurred. You seem to not have a profile even though you have an account.",
      });
    } else {
      const newInterview = profile.interviews.create({
        partner_nickname: req.body.partner_nickname,
      });
      profile.interviews.push(newInterview);
      profile.save(function (err) {
        if (err) {
          res.status(500).json({
            status: "error",
            message: err,
          });
        } else {
          res.status(200).json({
            status: "success",
            message: "New interview started!",
            data: newInterview,
          });
        }
      });
    }
  });
};

exports.endInterview = function (req, res) {
  Profile.findOneAndUpdate(
    { user_id: req.params.user_id, "interviews._id": req.body.interview_id },
    {
      $set: {
        "interviews.$.end": new Date(),
      },
    },
    (err, doc) => {
      if (err) {
        res.status(500).json({
          status: "error",
          message:
            "This error should not have occurred. You seem to not have a profile even though you have an account.",
        });
      } else {
        res.status(200).json({
          status: "success",
          message: "Interview completed!",
          data: doc,
        });
      }
    }
  );
};
