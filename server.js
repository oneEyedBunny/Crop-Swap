"user strict";

require('dotenv').config();
//importing 3rd party libraries
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport'); //protects endpoints

//creates new express app
const app = express()

// Modularize routes
const swapPostsRouter = require('./routes/swapPostsRouter'); //why am I not renaming this from router as well??
const usersRouter = require('./routes/usersRouter'); //why am I not renaming this from router as well??
const { router: authRouter } = require('./routes/authRouter'); //or why am I bothering to specify router?
const { localStrategy, jwtStrategy } = require('./auth/authStrategy');

//use strategy to protect endpoint
const jwtAuth = passport.authenticate('jwt', {
  session: false,
  failWithError: true
 });

// constants for the app
const {PORT, DATABASE_URL} = require('./config');

passport.use(localStrategy);
passport.use(jwtStrategy);

//log the http layer
app.use(morgan('common'));

//creates a static web server, servers static assets
app.use(express.static('public'));

//when requests come in, they get routed to the express router
app.use('/posts', swapPostsRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  //add check here to see if they're info is in local storage
  res.sendFile(__dirname + '/public/index.html');
});

//Mongoose uses built in es6 promises
mongoose.Promise = global.Promise;

//catch all in case user enters non-existent endpoint
app.use('*', function(req, res) {
  res.status(404).json({message: 'Sorry, Not Found'});
})

// app.use((err, req, res, next) => {
//   if (!err.status || err.status >= 500) {
//     return next(err);
//   }
//   res.status(err.status).json(
//     Object.assign({}, err, {
//       message: err.message
//     })
//   );
// });
//
// app.use((err, req, res, next) => {
//   console.error(err);
//
//   return res.status(req.status || 500).json({
//     message: 'Internal Server Error'
//   });
// });


let server;

//connects to DB, starts the http server and returns a promise > facilitates async testing
function runServer(databaseURL, port = PORT) {
  return new Promise((resolve, reject) => {
    //tried adding this in for 2nd param and it's throwing error ...{ useNewUrlParser: true }
    mongoose.connect(databaseURL, err => {
      if(err) {
        return reject(err);
      }
      server = app
      .listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    }
  );
});
}

//stops the server and returns a promise > facilitates async testing
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if(err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  });
}

//executable script and a module. allows runServer to be called directly with (npm start) or if
//required elsewhere, function wont be called, allowing server to start at different points >testing
if(require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};
