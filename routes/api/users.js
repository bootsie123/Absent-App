const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const keys = require("../../config/keys");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const cleanBody = require("../../middlewares/cleanBody");

const User = require("../../models/User");
const Profile = require("../../models/Profile");

const router = express.Router();

/*
  @route GET api/users/test
  @desc Tests user route
  @access Public
*/
router.get("/test", (req, res) => res.json({ msg: "Users Reachable" }));

/*
  @route POST api/users/register
  @desc Registers a new user
  @access Public
*/
router.post("/register", cleanBody, (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      errors.username = "Username already exists";
      return res.status(400).json(errors);
    }

    const newUser = new User({
      username: req.body.username,
      password: req.body.password
    });

    const newProfile = new Profile({ user: newUser.id });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        newUser.password = hash;
        newUser.save()
          .then((user) =>  {
            let userjson = user.toJSON();
            delete userjson.password;

            newProfile.save()
              .catch(console.log);

            res.json(userjson);
          })
          .catch(console.log);
      });
    });
  });
});

/*
  @route POST api/users/login
  @desc Login a user
  @access Public
*/
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username }).then(user => {
    if (!user) {
      errors.invalid = "Username or password is incorrect";
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          username
        };

        jwt.sign(payload, keys.secretOrKey, { expiresIn: "1h" }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        errors.invalid = "Username or password is incorrect";
        return res.status(404).json(errors);
      }
    });
  })
  .catch(console.log);
});

/*
  @route GET api/users/current
  @desc Returns the current user
  @access Private
*/
router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
  return res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email
  });
});

module.exports = router;
