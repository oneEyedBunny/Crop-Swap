"use strict"

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
describe('login validation', function () {
  let user;

  const username = "testing9090";
  const password = "testing0101";
  const firstName = "Terry";
  const lastName = "Tester";
  const email = "testing@yahoo.com";
  const city = "Portland";
  const zipCode = "97212";

  before(function() {
    return runServer(TEST_DATABASE_URL, PORT);
  });

  beforeEach(function () {
    return User.hashPassword(password)
    .then(password =>
      User.create({ firstName, lastName, username, password, email, city, zipCode })
    )
    .then(_user => {
        user = _user;
      });
  })

  afterEach(function () {
    return User.remove({});
  });

  after(function() {
    return closeServer();
  })


  describe('auth/login', function () {

  it.only('Should reject requests with no credentials', function () {
    console.log("Hiiiiii");
    return chai
      .request(app)
      .post('auth/login')
      .send({})
      .then(res => {
        console.log("Hello", res.body.message);
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal("No credentials provided");
      });
   });

 }); ////////////////////////////////Closes describe
}); ////////////closes hook

//   it('Should reject requests with incorrect usernames', function () {
//     return chai
//       .request(app)
//       .post('auth/login')
//       .send({ username: 'wrongUsername', password })
//       .then(() =>
//         expect.fail(null, null, 'Request should not succeed')
//       )
//       .catch(err => {
//         if (err instanceof chai.AssertionError) {
//           throw err;
//         }
//
//         const res = err.response;
//         expect(res).to.have.status(401);
//       });
//   });
//   it('Should reject requests with incorrect passwords', function () {
//     return chai
//       .request(app)
//       .post('/api/auth/login')
//       .send({ username, password: 'wrongPassword' })
//       .then(() =>
//         expect.fail(null, null, 'Request should not succeed')
//       )
//       .catch(err => {
//         if (err instanceof chai.AssertionError) {
//           throw err;
//         }
//
//         const res = err.response;
//         expect(res).to.have.status(401);
//       });
//   });
//   it('Should return a valid auth token', function () {
//     return chai
//       .request(app)
//       .post('/api/auth/login')
//       .send({ username, password })
//       .then(res => {
//         expect(res).to.have.status(200);
//         expect(res.body).to.be.an('object');
//         const token = res.body.authToken;
//         expect(token).to.be.a('string');
//         const payload = jwt.verify(token, JWT_SECRET, {
//           algorithm: ['HS256']
//         });
//         expect(payload.user).to.deep.equal({
//           username,
//           firstName,
//           lastName
//         });
//       });
//   });
// });
//
// describe('/api/auth/refresh', function () {
//   it('Should reject requests with no credentials', function () {
//     return chai
//       .request(app)
//       .post('/api/auth/refresh')
//       .then(() =>
//         expect.fail(null, null, 'Request should not succeed')
//       )
//       .catch(err => {
//         if (err instanceof chai.AssertionError) {
//           throw err;
//         }
//
//         const res = err.response;
//         expect(res).to.have.status(401);
//       });
//   });
//   it('Should reject requests with an invalid token', function () {
//     const token = jwt.sign(
//       {
//         username,
//         firstName,
//         lastName
//       },
//       'wrongSecret',
//       {
//         algorithm: 'HS256',
//         expiresIn: '7d'
//       }
//     );
//
//     return chai
//       .request(app)
//       .post('/api/auth/refresh')
//       .set('Authorization', `Bearer ${token}`)
//       .then(() =>
//         expect.fail(null, null, 'Request should not succeed')
//       )
//       .catch(err => {
//         if (err instanceof chai.AssertionError) {
//           throw err;
//         }
//
//         const res = err.response;
//         expect(res).to.have.status(401);
//       });
//   });
//   it('Should reject requests with an expired token', function () {
//     const token = jwt.sign(
//       {
//         user: {
//           username,
//           firstName,
//           lastName
//         },
//       },
//       JWT_SECRET,
//       {
//         algorithm: 'HS256',
//         subject: username,
//         expiresIn: Math.floor(Date.now() / 1000) - 10 // Expired ten seconds ago
//       }
//     );
//
//     return chai
//       .request(app)
//       .post('/api/auth/refresh')
//       .set('authorization', `Bearer ${token}`)
//       .then(() =>
//         expect.fail(null, null, 'Request should not succeed')
//       )
//       .catch(err => {
//         if (err instanceof chai.AssertionError) {
//           throw err;
//         }
//
//         const res = err.response;
//         expect(res).to.have.status(401);
//       });
//   });
//   it('Should return a valid auth token with a newer expiry date', function () {
//     const token = jwt.sign(
//       {
//         user: {
//           username,
//           firstName,
//           lastName
//         }
//       },
//       JWT_SECRET,
//       {
//         algorithm: 'HS256',
//         subject: username,
//         expiresIn: '7d'
//       }
//     );
//     const decoded = jwt.decode(token);
//
//     return chai
//       .request(app)
//       .post('/api/auth/refresh')
//       .set('authorization', `Bearer ${token}`)
//       .then(res => {
//         expect(res).to.have.status(200);
//         expect(res.body).to.be.an('object');
//         const token = res.body.authToken;
//         expect(token).to.be.a('string');
//         const payload = jwt.verify(token, JWT_SECRET, {
//           algorithm: ['HS256']
//         });
//         expect(payload.user).to.deep.equal({
//           username,
//           firstName,
//           lastName
//         });
//         expect(payload.exp).to.be.at.least(decoded.exp);
//       });
//   });
