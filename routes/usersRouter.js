"use strict";

//importing 3rd party libraries
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const bodyParser = require('body-parser');

//Mongoose uses built in es6 promises
mongoose.Promise = global.Promise;

// Modularize routes
const {User} = require('../models');

//applies body parser to all router calls
router.use(bodyParser.json({ limit: '500kb', extended: true }));
router.use(bodyParser.urlencoded({ limit: '500kb', extended: true }));

//route to return a specific user
router.get('/', (req, res, next) => {
  User
  .find()
  .then(users => {
    console.log(users)
    res.json(users);
    })
    .catch(err => {
      next(err);
    });
});






module.exports = router;
