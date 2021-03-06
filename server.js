"user strict";

require('dotenv').config();
//importing 3rd party libraries
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

//creates new express app
const app = express()

// Modularize routes
const {PORT, DATABASE_URL} = require('./config');
const swapPostsRouter = require('./routes/swapPostsRouter');
const usersRouter = require('./routes/usersRouter');
const authRouter = require('./routes/authRouter');
const jwtAuth = require('./auth/jwt-auth');

//log the http layer
app.use(morgan('common'));

//creates a static web server, servers static assets
app.use(express.static('public'));

// Parse request body
app.use(express.json());

//when requests come in, they get routed to the express router
app.use('/posts', swapPostsRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

//catch all in case user enters non-existent endpoint
app.use('*', function(req, res) {
  res.status(404).json({message: 'Sorry, Not Found'});
})

// Custom 404 Not Found route handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//Custom Error Handler
app.use((err, req, res, next) => {
  if (err.status) {
    const errBody = Object.assign({}, err, { message: err.message });
    res.status(err.status).json(errBody);
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
    console.error(err);
  }
});


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
