"use strict"

//importing 3rd party dependencies
const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require('passport');
// const bodyParser = require('body-parser'); not needed anymore inbedded in express

const router = express.Router();

const config = require('../config');

//create a signed jwt
const createAuthToken = function(user) {
  return jwt.sign({user}, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

const localAuth = passport.authenticate('local', {session: false});

router.use(express.json());

// The user provides a username and password to login
router.post('/auth/login', localAuth, (req, res) => {
  const authToken = createAuthToken(req.user.serialize());
  res.json({authToken});
});

const jwtAuth = passport.authenticate('jwt', {session: false});

// The user exchanges a valid JWT for a new one with a later expiration
router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({authToken});
});

module.exports = {router};
