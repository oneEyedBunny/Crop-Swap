'use strict';

//import dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');

//lets us use expect & should style syntax in tests
const expect = chai.expect;
const should = chai.should();

//lets us make http requests in our tests
chai.use(chaiHttp);

//setup of endpoints
describe('index page', function() {
  it('should return index.html', function() {
    return chai.request(app)
    .get('/')
    .then(function(res) {
      expect(res).to.have.status(200);
    });
  });
});

describe('posts page', function() {
  it('should return post.html', function() {
    return chai.request(app)
    .get('/createPost.html')
    .then(function(res) {
      expect(res).to.have.status(200);
    });
  });
});

describe('profile page', function() {
  it('should return results.html', function() {
    return chai.request(app)
    .get('/results.html')
    .then(function(res) {
      expect(res).to.have.status(200);
    });
  });
});
