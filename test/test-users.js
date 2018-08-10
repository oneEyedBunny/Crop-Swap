"use strict";

//import dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../server');
const { tearDownDb, get, seedAllData } = require('./database');

const { PORT, TEST_DATABASE_URL } = require('../config');

const { User } = require('../models');

//lets us use expect & should style syntax in tests
const expect = chai.expect;
const should = chai.should();

//lets us make http requests in tests
chai.use(chaiHttp);

//hooks to return promises
describe('Obtaining swap posts', function () {

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

  describe("POST /users", function () {

    it.only("Should create a new user", function () {
      let res;
      let newUser= {
        firstName: "Terry",
        lastName: "Tester",
        username: "testing9090",
        password: "testing0101",
        city: "Portland",
        zipCode: "97212",
        email: "testing@yahoo.com"
      }
      return chai
        .request(app)
        .post("/users")
        .send(newUser)
        .then(_res => {
          res = _res;
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.all.keys("userId", "username", "authToken");
          expect(res.body.username).to.equal(newUser.username);
          return User.findOne({username: newUser.username });
        })
        .then(user => {
          console.log("user===", user);
          console.log("newUser", newUser)
          expect(user).to.exist;
          expect(user.id).to.equal(res.body.userId);
          expect(user.firstName).to.equal(newUser.firstName);
          expect(user.lastName).to.equal(newUser.lastName);
          expect(user.email).to.equal(newUser.email);
          expect(user.city).to.equal(newUser.city);
          //expect(user.zipCode).to.equal(newUser.zipCode);
        })
    });
  });
}); //closes hook
