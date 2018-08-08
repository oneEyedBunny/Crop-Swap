"use strict";

//import 3rd party libraries
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

//Mongoose uses built in es6 promises
mongoose.Promise = global.Promise;

//defining schema for users
const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true, minlength: 5, maxlength: 50 },
    password: { type: String, required: true , minlength: 10, maxlength: 200 },
    city: { type: String, required: true },
    zipCode: { type: Number, required: true },
    email: { type: String, required: true, unique: true, lowercase: true }
});

//represents how the outside world sees our users
userSchema.methods.serialize = function() {
  return {
    username: this.username || '',
    firstName: this.firstName || '',
    lastName: this.lastName || '',
    id: this.id || '',
    email: this.email || '',
    zipCode: this.zipCode || '',
    city: this.city || ''
  };
};

//validate that password is sufficient
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

//encrpts pw with 10 salt rounds
userSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
}


//defining schema for posts
const swapPostSchema = mongoose.Schema({
      have: { type: String, required: true },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
      want: { type: String },
      zipCode: { type: String, required: true },
      city: { type: String, required: true }
});

//Mongoogse uses timestamps for createAt and updateAt for specified schemas
swapPostSchema.set("timestamps", true);

//represents how swap posts are represented outside our app via our api
swapPostSchema.methods.serialize = function() {
  return {
    id: this._id,
    have: this.have,
    username: this.user.username,
    email: this.user.email,
    created: this.createdAt.toDateString(),
    want: this.want,
    zipCode: this.zipCode,
    city: this.city
  };
};

//Creates new Mongoose models (User & swapPosts) off the users & swapPosts collection in the DB using the Schema defined above
const User = mongoose.model('Users', userSchema, 'Uses');
const SwapPost = mongoose.model('swapPosts', swapPostSchema, 'swapPosts');

module.exports = {User, SwapPost};
