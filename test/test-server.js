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

//normal test case for GET route
describe('index page', function() {
  it('should return index.html', function() {
    return chai.request(app)
    .get('/')
    .then(function(res) {
      expect(res).to.have.status(200);
    });
  });
});
