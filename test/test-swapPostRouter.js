'use strict';

//import dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../server');
const { tearDownDb, get, seedAllData } = require('./database');

// const { PORT, TEST_DATABASE_URL } = require('../config');
//
// const { SwapPost } = require('../models');
// // const { SwapPost } = require('../routes/swapPostsRouter');
//
// // const { seedUsers } = require("./seed/users");
//
// //lets us use expect & should style syntax in tests
// const expect = chai.expect;
// const should = chai.should();
//
// //lets us make http requests in tests
// chai.use(chaiHttp);
//
// //hooks to return promises
// describe("Obtaining swap posts", function () {
//
//   before(function() {
//     return runServer(TEST_DATABASE_URL, PORT);
//   });
//
//   beforeEach(function () {
//     return seedAllData();
//   });
//
//   afterEach(function() {
//     return tearDownDb();
//   });
//
//   after(function() {
//     return closeServer();
//   });
//
//
//   describe('GET all endpoint', function() {
//
//     //normal test case for returning all posts- no filter, checking count
//     it.only('should return the correct number of swap posts', function() {
//       let res;
//       return chai.request(app)
//       .get('/posts')
//       .then(function(_res) {
//         res = _res;
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;
//         expect(res).to.be.a('object');
//         console.log("Swap Posts", res.body.swapPosts)
//         expect(res.body.swapPosts).to.have.lengthOf.at.least(1);
//         return SwapPost.count();
//       })
//       .then(function(count) {
//         expect(res.body.swapPosts).to.have.lengthOf(count);
//       });
//     });
//
//     //normal test case for returning all posts- no filter, checking fields accuracy
//     it('should return swaps with the correct fields', function() {
//       let post;
//       return chai.request(app)
//       .get('/posts')
//       .then(function(res) {
//         console.log("BODY", res.body.swapPosts);
//         res.body.swapPosts.forEach(function(swapPost) {
//           expect(swapPost).to.include.all.keys(
//             'id', 'have', 'username','email','created','want');
//           });
//           post = res.body.swapPosts[0];
//           console.log("POST", post);
//           return SwapPost.findById(post.id);
//         })
//         .then(function(swapPost) {
//           expect(post.id).to.equal(swapPost.id);
//           expect(post.have).to.equal(swapPost.have);
//           //expect(post.created).to.equal(swapPost.created);
//           expect(post.want).to.equal(swapPost.want);
//         });
//       });
//     });
//
//     //normal test case for returning all posts- with a filter condition
//     describe('GET all endpoint with filter', function() {
//
//       it('should return the correct swap posts when filtered', function() {
//         const type = 'have';
//         const item = 'cucumbers';
//         return chai.request(app)
//         .get(`/posts?type=${type}&item=${item}`)
//         .then(function(res) {
//           expect(res).to.have.status(200);
//           expect(res).to.be.json;
//           expect(res).to.be.a("object");
//           expect(res).to.have.lengthOf(2); //visually checked how many posts have cucumber in them
//         });
//       });
//     });
//
//      //normal test case for returning all posts for a specific user
//     describe('GET all for a specific user endpoint', function() {
//
//       it('should return the correct number of swap posts for a user', function() {
//         let testUserId = '5b566d443fedefe19eb684d9';
//         let res ;
//         return chai.request(app)
//         .get(`/posts/user/${testUserId}`)
//         .then(function(_res) {
//           res = _res;
//           expect(res).to.have.status(200);
//           expect(res).to.be.json;
//           expect(res).to.be.a("object");
//
//           res.body.swapPosts.forEach(function(swapPost) {
//             expect(swapPost).to.include.all.keys(
//               'id', 'have', 'username','email','created','want');
//             });
//           console.log("res.body=", res.body, typeof res.body);
//           return SwapPost.find({user: testUserId});
//         })
//         .then(function(swapPosts) {
//           console.log("swapPosts=", swapPosts);
//           //expect(swapPosts[0].user).equals(test); //need to find a way to connect username and user
//           expect(swapPosts).to.have.lengthOf(res.body.swapPosts.length);
//         });
//       });
//     });
//
//     // describe('POST endpoint', function() {
//     //
//     //   it.only('should add a new swapPost', function() {
//     //     const newPost = {
//     //       "have": "Carrots",
//     //       "want": "Mushrooms",
//     //       "user": "5b566d443fedefe19eb684d9"
//     //     };
//     //     let res;
//     //
//     //     return chai.request(app)
//     //     .post('/posts')
//     //     .send(newPost)
//     //     .then(function(_res) {
//     //       res= _res;
//     //       console.log("Body", res.body);
//     //       expect(res).to.have.status(201);
//     //       expect(res).to.be.json;
//     //       expect(res.body).to.be.a('object');
//     //       expect(res.body).to.include.all.keys(
//     //         'id', 'have', 'want', 'username', 'email', 'created');
//     //         expect(res.body.id).to.not.be.null; // cause Mongo should have created id on insertion
//     //         expect(res.body.have).to.equal(newPost.have);
//     //         expect(res.body.want).to.equal(newPost.want);
//     //         expect(res.body.user).to.equal(newPost.user);
//     //
//     //         return SwapPost.findById(res.body.id);
//     //       })
//     //       .then(function(swapPost) {
//     //         expect(swapPost.have).to.equal(newPost.have);
//     //         expect(swapPost.want).to.equal(newPost.want);
//     //         expect(swapPost.username).to.equal(res.body.username);
//     //         expect(swapPost.created).to.equal(res.body.created);
//     //         expect(swapPost.email).to.equal(res.body.email);
//     //       });
//     //     });
//     //   });
//
//       describe('DELETE endpoint', function() {
//
//         it('delete a swapPost by id', function() {
//           let swapPost;
//           return SwapPost
//           .findOne()
//           .then(function(_swapPost) {
//             swapPost = _swapPost;
//             return chai.request(app)
//             .delete(`/posts/${swapPost.id}`);
//           })
//           .then(function(res) {
//             expect(res).to.have.status(204);
//             return SwapPost.findById(swapPost.id);
//           })
//           .then(function(_swapPost) {
//             expect(_swapPost).to.be.null;
//           });
//         });
//       });
//
//       // describe('PUT endpoint', function() {
//       //
//       //   it('updates a swapPost by id', function() {
//       //   })
//       // })
//
//     }) //closes describe stmt with hooks
