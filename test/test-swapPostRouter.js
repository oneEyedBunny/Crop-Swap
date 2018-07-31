'use strict';

//import dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../server.js');
const { tearDownDb, get, seedAllData } = require('./database.js');

const { PORT, TEST_DATABASE_URL } = require('../config');

const swapPostsRouter = require('../routes/swapPostsRouter');

//const { seedUsers } = require("./seed/users");

//lets us use expect & should style syntax in tests
const expect = chai.expect;
const should = chai.should();

//lets us make http requests in tests
chai.use(chaiHttp);

//hooks to return promises
describe("Obtaining swap posts", function () {

  before(function() {
    return runServer(TEST_DATABASE_URL, PORT);
  });

  beforeEach(function () {
    return seedAllData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  //normal test case for returning all posts- no filter, checking count
  describe('GET all endpoint', function() {
    it.only('should return the correct number of swap posts', function() {
      return chai.request(app)
      .get('/posts')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res).to.be.a('object');
        console.log(res.body.swapPosts);
        //console.log("My length is", seedUsers);
        //expect(res.body.swapPosts).to.have.length(seedUsers);
      });
    });
  }); //closes get all test

  //normal test case for returning all posts- no filter, checking fields accuracy
  // describe('GET all endpoint', function() {
  //   it.only('should return swaps with the correct fields', function() {
  //     return chai.request(app)
  //     .get('/posts')
  //     .then(function(res) {
  //       res.body.swapPosts.forEach(function(swapPost) {
  //           expect(swapPost).to.include.keys(
  //             'id', 'have', 'want','user');
  //         });
  //         post = res.body.swapPosts[0];
  //         return SwapPost.findById(post.id);
  //       })
  //       .then(function(swapPost) {
  //         expect(post.id).to.equal(swapPost.id);
  //         expect(post.have).to.equal(swapPost.have);
  //         expect(post.want).to.equal(swapPost.want);
  //         expect(post.user).to.equal(swapPost.user);
  //       });
  //   });
  // });

  // //normal test case for returning all posts- with a filter condition
  // describe('GET all endpoint with filter', function() {
  //   it.only('should return the correct number of swap posts when filtered', function() {
  //     return chai.request(app)
  //     .get('/posts')
  //     .then(function(res) {
  //       expect(res).to.have.status(200);
  //       expect(res).to.be.json;
  //       expect(res).to.be.a("object");
  //       //console.log("My length is", seedUsers);
  //       //expect(res.body.swapPosts).to.have.length(seedUsers);
  //     });
  //   });
  // });
  // //normal test case for returning all posts for a specific user
  // describe('GET all for a specific user endpoint', function() {
  //   it.only('should return the correct number of swap posts for a user', function() {
  //     return chai.request(app)
  //     .get('/posts')
  //     .then(function(res) {
  //       expect(res).to.have.status(200);
  //       expect(res).to.be.json;
  //       expect(res).to.be.a("object");
  //     });
  //   });
  // });






}) //closes describe stmt
