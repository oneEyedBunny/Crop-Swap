"use strict"

//importing 3rd party dependencies
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const config = require('../config');
const router = express.Router();

//testing this
// const {router: authRouter, localStrategy, jwtStrategy} = require('../auth/authStrategy');
// passport.use(localStrategy);
// passport.use(jwtStrategy);
// end testing this





//create a signed jwt
const createAuthToken = function(user) {
  return jwt.sign({user}, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

const localAuth = passport.authenticate('local', {
  session: false,
  failWithError: true
});

router.use(express.json());

// The user provides a username and password to login and is given a token
router.post('/login', localAuth, (req, res) => {
  const authToken = createAuthToken(req.user.serialize());
  const user = req.user.serialize();
  res.json({
    authToken: authToken,
    userId: user.id,
    username: user.username
  });
});

const jwtAuth = passport.authenticate('jwt', {
  session: false,
  failWithError: true
});

// The user exchanges a valid JWT for a new one with a later expiration
router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({authToken});
});

module.exports = {router, createAuthToken};
