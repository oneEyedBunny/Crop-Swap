"use strict";

//import dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
// const mongoose = require('mongoose');

const {app} = require('../server.js');

//lets us use expect & should style syntax in tests
const expect = chai.expect;
const should = chai.should();

//lets us make http requests in our tests
chai.use(chaiHttp);

//testing html page loads
describe('index page', function() {
  it('should return index.html', function() {
    return chai.request(app)
    .get('/')
    .then(function(res) {
      expect(res).to.have.status(200);
      expect(res).to.be.html;
    });
  });
});

//testing html page loads
describe('create posts page', function() {
  it('should return createPost.html', function() {
    return chai.request(app)
    .get('/createPost.html')
    .then(function(res) {
      expect(res).to.have.status(200);
      expect(res).to.be.html;
    });
  });
});

//testing html page loads
describe('results page', function() {
  it('should return results.html', function() {
    return chai.request(app)
    .get('/results.html')
    .then(function(res) {
      expect(res).to.have.status(200);
      expect(res).to.be.html;
    });
  });
});

//testing if nonexist page is opened
describe('404 handler', () => {
  it('should respond with 404 when given a bad path', () => {
    return chai.request(app)
    .get('/badpath')
    .then(res => {
      expect(res).to.have.status(404);
    });
  });
});
