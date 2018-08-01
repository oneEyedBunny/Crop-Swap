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
const {SwapPost} = require('../models');

//applies body parser to all router calls
router.use(bodyParser.json({ limit: '500kb', extended: true }));
router.use(bodyParser.urlencoded({ limit: '500kb', extended: true }));

//return all the posts or if a specified item is searched for, only those items
router.get('/', (req, res) => {
  let type = req.query.type || 'have';
  let regex = {'have': new RegExp(req.query.item, 'i')};
  if (type === 'want') {
    regex = {'want': new RegExp(req.query.item, 'i')};
  }
  SwapPost
  .find(regex)
  .populate('user')
  .then(swapPosts => {
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
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      const err = new Error("The `id` is not valid");
      err.status = 400;
      return next(err);
    }
    SwapPost
    .findById(req.params.id)
    .populate('user')
    .then(swapPost => {
      res.json(swapPost.serialize()
    )})
    .catch(err => {
      console.error(err);
      res.status(500).json({error: "internal server error"});
    });
  });

 //displays all posts for a specific user
  router.get('/user/:id', (req, res) => {
    let id = req.params.id;
    console.log(id);
  SwapPost
    .find( { user: id } )
    .populate('user')
    .then(swapPosts => {
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

  //creates a new swap post after checking all required fields are present
  router.post('/', (req, res) => {
    const requiredFields =  ['have', 'user'];
    for(let i = 0; i < requiredFields.length; i++) {
      if(!(requiredFields[i] in req.body)) {
        const errorMessage = (`Missing \`${requiredFields[i]}\` in request body`);
        console.error(errorMessage);
        return res.status(400).send(errorMessage);
      }
    }
    SwapPost
    .create({
      have: req.body.have,
      user: req.body.user,
      want: req.body.want
    })
    .then(swapPost => {
      SwapPost.populate(swapPost, "user")
      .then(swapPostUser => {
      res.status(201).json(swapPost.serialize())
      })
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: "Internal server error"})
    });
  });

  //deletes a specified swap
  router.delete('/:id', (req, res) => {
    SwapPost
    .findByIdAndRemove(req.params.id)
    .then(swapPost => {
      console.log(`Deleted swap ${req.params.id}`);
      res.status(204).end();
    })
    .catch(err => {
      res.status(500).json({message: "Internal server error"})
    })
  });

  //updates a specified swap
  router.put('/:id', (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      const err = new Error("The `id` is not valid");
      err.status = 400;
      return next(err);
    }
    let updatedPost = {};
    let updateableFields = ['have', 'want'];
    updateableFields.forEach(field => {
      if(field in req.body) {
        updatedPost[field] = req.body[field];
      }
    });
    SwapPost
    .findByIdAndUpdate(req.params.id, {$set:updatedPost})
    .then(swapPost => {
      console.log(`Updating blog post with blog id ${req.params.id}`);
      res.status(204).end()
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: "Something went wrong"});
    });
  });


module.exports = router;
