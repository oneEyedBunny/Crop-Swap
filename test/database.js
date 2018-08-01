"use strict";
//used to tear down test db
const mongoose = require("mongoose");

// const { TEST_DATABASE_URL } = require('../config');
const { SwapPost, User } = require('../models');

const seedSwapPosts = require("./seed/swapPosts");
const seedUsers = require("./seed/users");


function get() {
  return mongoose;
}

// seeds test db with 2 json files
function seedAllData() {
  console.info('seeding testDB data');
  return User.insertMany(seedUsers)
  .then(() => {
    return SwapPost.insertMany(seedSwapPosts)
  });
}

// deletes the entire database. Call it in `afterEach` block to ensure data is wiped before next test
function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

// beforeEach(function () {
//   return Promise.all([
//     User.insertMany(seedUsers),
//     SwapPost.insertMany(seedSwapPosts),
//   ])
//     .then(
//     );
// });



module.exports = { tearDownDb, get, seedAllData };
