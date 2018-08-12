"use strict";

//import dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const { app, runServer, closeServer } = require('../server');
const { tearDownDb, get, seedAllData } = require('./database');

const { PORT, TEST_DATABASE_URL, JWT_SECRET } = require('../config');

const { SwapPost } = require('../models');

//lets us use expect & should style syntax in tests
const expect = chai.expect;
const should = chai.should();

//lets us make http requests in tests
chai.use(chaiHttp);

//hooks to return promises
describe('Obtaining swap posts', function () {

  let user ;
  let authToken;

  before(function() {
    return runServer(TEST_DATABASE_URL, PORT);
  });

  beforeEach(function () {
    return Promise.all([
      seedAllData()
    ])
    .then(([users]) => {
        user = users[0];
        authToken = jwt.sign({ user }, JWT_SECRET);
        //console.log("user", user);
      });
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });


  describe('GET all endpoint', function() {

    //normal test case for returning all posts- no filter, checking count
    it('should return the correct number of swap posts', function() {
      let res;
      return chai.request(app)
      .get('/posts')
      .then(function(_res) {
        res = _res;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res).to.be.a('object');
        //console.log('Swap Posts =', res.body.swapPosts)
        expect(res.body.swapPosts).to.have.lengthOf.at.least(1);
        return SwapPost.count();
      })
      .then(function(count) {
        expect(res.body.swapPosts).to.have.lengthOf(count);
      });
    });

    //normal test case for returning all posts- no filter, checking fields accuracy
    it('should return swaps with the correct fields', function() {
      let post;
      return chai.request(app)
      .get('/posts')
      .then(function(res) {
        //console.log('BODY', res.body.swapPosts);
        res.body.swapPosts.forEach(function(swapPost) {
          expect(swapPost).to.include.all.keys(
            'id', 'have', 'username','email','created','want', "zipCode", "city");
          });
          post = res.body.swapPosts[0];
          //console.log('POST', post);
          return SwapPost.findById(post.id);
        })
        .then(function(swapPost) {
          //console.log("swapPost = ", swapPost)
          //console.log('POST', post);
          expect(post.id).to.equal(swapPost.id);
          expect(post.have).to.equal(swapPost.have);
          // expect(post.id).to.equal(swapPost.user);
          expect(post.want).to.equal(swapPost.want);
          expect(post.zipCode).to.equal(swapPost.zipCode);
          expect(post.city).to.equal(swapPost.city);
        });
      });
    }); //closes describe

  //normal test case for returning all posts- with a filter condition
  describe('GET all endpoint with filter', function() {

    it('should return the correct swap posts when filtered', function() {
      const type = 'have';
      const item = 'cucumbers';
      const location = 'portland';
      return chai.request(app)
      .get(`/posts?type=${type}&item=${item}&loc=${location}`)
      .then(function(res) {
        //console.log('res.body', res.body);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res).to.be.a('object');
        expect(res.body.swapPosts).to.have.lengthOf(2); //visually checked how many posts have cucumber in them
      });
    });
  });

     //normal test case for returning all posts for a specific user
    describe('GET all for a specific user endpoint', function() {

      it('should return the correct number of swap posts for a user', function() {
        let testUserId = '5b566d443fedefe19eb684d9';
        let res ;
        return chai.request(app)
        .get(`/posts/user/${testUserId}`)
        .then(function(_res) {
          res = _res;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res).to.be.a('object');
          //console.log('res.body=', res.body, typeof res.body);
          return SwapPost.find({user: testUserId});
        })
        .then(function(swapPosts) {
          //console.log('swapPosts=', swapPosts);
          expect(swapPosts).to.have.lengthOf(res.body.swapPosts.length);
        });
      });
    });

    //normal test case for creating a new post
    describe('POST endpoint', function() {

      it('should add a new swapPost', function() {
        const newPost = {
          'have': 'Carrots',
          'want': 'Mushrooms',
          'user': '5b566d443fedefe19eb684d9',
          'city': 'Portland',
          'zipCode': '97211'
        };
        let res;
        let postId;
        return chai.request(app)
        .post('/posts')
        .set("Authorization", `Bearer ${authToken}`)
        .send(newPost)
        .then(function(_res) {
          res= _res;
          //console.log('Body', res.body);
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.all.keys(
            'id', 'have', 'want', 'username', 'email', 'created','zipCode', 'city', );
          expect(res.body.id).to.not.be.null;
          expect(res.body.have).to.equal(newPost.have);
          expect(res.body.want).to.equal(newPost.want);
          postId= res.body.id;
          //console.log("id", postId);

          return SwapPost.findById(res.body.id);
          })
          .then(function(swapPost) {
            //console.log('swapPost', swapPost);
            expect(swapPost._id.toString()).to.equal(postId);
            expect(swapPost.user.toString()).to.equal(newPost.user);
            expect(swapPost.have).to.equal(newPost.have);
            expect(swapPost.want).to.equal(newPost.want);
            expect(swapPost.city).to.equal(newPost.city);
            expect(swapPost.zipCode).to.equal(newPost.zipCode);
          });
        });
      });

//normal test case for deleting a swap post
  describe('DELETE endpoint', function() {

    it('delete a swapPost by id', function() {
      let swapPost;
      return SwapPost
      .findOne()
      .then(function(_swapPost) {
        swapPost = _swapPost;
        //console.log("swapPost=", swapPost)
        return chai.request(app)
        .delete(`/posts/${swapPost._id}`)
        .set("Authorization", `Bearer ${authToken}`)
      })
      .then(function(res) {
        expect(res).to.have.status(204);
        return SwapPost.findById(swapPost._id);
      })
      .then(function(_swapPost) {
        expect(_swapPost).to.be.null;
      });
    });
  });

//normal test case for updating a swap post
  describe('PUT endpoint', function() {

    it('updates a swapPost by id', function() {
      const updatedPost = {
        "have": "testing have",
        "want": "testing want"
      };
      return chai
      .request(app)
      .get('/posts')
      .then(function(res) {
        updatedPost.id = res.body.swapPosts[0].id;
        console.log("updatedPost=", updatedPost);
        return chai.request(app)
        .put(`/posts/${updatedPost.id}`)
        .send(updatedPost)
        .set("Authorization", `Bearer ${authToken}`)
      })
      .then(res => {
        expect(res).to.have.status(204);
        return SwapPost.findById(updatedPost.id);
      })
      .then(res => {
        console.log("final res", res);
        expect(res).to.be.a("object");
        expect(res.have).to.equal(updatedPost.have);
        expect(res.want).to.equal(updatedPost.want);
      });
    });
  })

}); //closes describe stmt with hooks
