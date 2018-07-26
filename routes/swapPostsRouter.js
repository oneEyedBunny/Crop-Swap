"use strict";

//importing 3rd party libraries
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

//Mongoose uses built in es6 promises
mongoose.Promise = global.Promise;

// Modularize routes to posts
const {SwapPost} = require('../models');

//return all the posts or if a specified item is searched for, only those items
router.get('/', (req, res) => {
  SwapPost
    .find()
    .then(swapPosts => {
      console.log(swapPosts);
      res.json({
        swapPosts: swapPosts.map(swapPost =>
         swapPost.serialize()
       )});
    })
  .catch(err => {
    console.error(err);
    res.status(500).json({error: "internal server error"});
  });
});

//return the results of a specified search item
router.get('/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("The `id` is not valid");
    err.status = 400;
    return next(err);
  }
  SwapPost
    .findById(req.params.id)
    .then(swapPost => {
      res.json(swapPost.serialize()
    )})
  .catch(err => {
    console.error(err);
    res.status(500).json({error: "internal server error"});
  });
});

//creates a new swap post after checking all required fields are present
// router.post('/posts', (req, res) => {
//   const requiredFields =  ['have', 'user'];
//   for(let i = 0; i < requiredFields.length; i++) {
//     if(!(requiredFields[i] in req.body)) {
//       const errorMessage = (`Missing \`${requiredFields[i]}\` in request body`);
//       console.error(errorMessage);
//       return res.status(400).send(errorMessage);
//     }
//   }
//   SwapPost
//     .create({
//       have: req.body.have,
//       user: req.body.user,
//       createdAt: req.body.createdAt,
//       want: req.body.want
//     })
//     .then(post => {res.status(201).json(post.serialize())
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({message: "Internal server error"})
//     });
//   });

module.exports = router;
