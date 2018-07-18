"use strict";

//importing 3rd party libraries
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Mongoose uses built in es6 promises
mongoose.Promise = global.Promise;

// Modularize routes to posts
const {Post} = require('./models');

//when the results route is called, return all the posts
router.get('/results', (req, res) => {
  Post
    .find()
    .then(posts => {
      res.json({
        posts: posts.map(post =>
         post.serialize()
       )});
    })
  .catch(err => {
    console.error(err);
    res.status(500).json({error: "internal server error"});
  });
});


module.exports = router;
