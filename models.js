"use strict";

//import 3rd party libraries
const uuid = require('uuid');
const mongoose = require('mongoose');

//Mongoose uses built in es6 promises
mongoose.Promise = global.Promise;

//defining schema for posts
const postSchema = mongoose.Schema({
      title: { type: String, required: true },
      description: { type: String, required: true },
      username: { type: String, required: true },
      created: { type: Date, default: Date.now },
      swap_for: [String]
});

//represents how posts are represented outside our app via our api
postSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    description: this.description,
    username: this.username,
    created: this.created,
    swap_for: this.swap_for
  };
};

//Creates a new Mongoose model (Posts) off the posts collection in the DB using the Schema defined above
const Post = mongoose.model('Posts', postSchema);

module.exports = {Post};
