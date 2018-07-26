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
    userName: { type: String, required: true, unique: true  },
    password: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: Number, required: true }
});

//defining schema for posts
const swapPostSchema = mongoose.Schema({
      have: { type: String, required: true },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      want: { type: String },
      comments: [ {
       content: { type: String },
       postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
   }]
});

//Mongoogse uses timestamps for createAt and updateAt for specified schemas
swapPostSchema.set("timestamps", true);

//validate that password is sufficient
// userSchema.methods.validatePassword = function(password) {
//   return bcrypt.compare(password, this.password);
// };
//
// //encrpts pw with 10 salt rounds
// userSchema.statics.hashPassword = function(password) {
//   return bcrypt.hash(password, 10);
// }

//create a virtual so the username can be retrieved for serialize
// userSchema.virtual('userName').get(function(user) {
//   return
// });

//represents how swap posts are represented outside our app via our api
swapPostSchema.methods.serialize = function() {
  return {
    id: this._id,
    have: this.have,
    //userName: this.user.userName,
    //created: this.createdAt,
    want: this.want,
    comments: this.comments
  };
};

//Creates new Mongoose models (User & swapPosts) off the users & swapPosts collection in the DB using the Schema defined above
const User = mongoose.model('Users', userSchema);
const SwapPost = mongoose.model('swapPosts', swapPostSchema, 'swapPosts');

module.exports = {User, SwapPost};