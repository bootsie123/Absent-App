const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport")

const cleanBody = require("../../middlewares/cleanBody");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

const router = express.Router();

/*
  @route GET api/profile/test
  @desc Tests user route
  @access Public
*/
router.get("/test", (req, res) => res.json({ msg: "Profile Reachable" }));

/*
  @route GET api/profile
  @desc Gets the current users profile
  @access Private
*/
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (!profile) {
        errors.noprofile = "No profile found for this user";
        return res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

/*
  @route PUT api/profile
  @desc Updates a users profile
  @access Private
*/
router.put("/", [cleanBody, passport.authenticate("jwt", { session: false })], (req, res) => {
  const errors = {};

  const profileFields = { user: req.user.id };

  if (req.body.bio) profileFields.bio = req.body.bio;

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true, upsert: true })
        .then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
