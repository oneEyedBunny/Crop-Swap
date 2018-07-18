"user strict";

//importing 3rd party libraries
const express = require('express');
const morgan = require('morgan');

//creates the new express app
const app = express()

// Modularize routes
const appRouter = require("./appRouter");

// constants for the app
const {PORT, DATABASE_URL} = require('./config');

//serves static assets
app.use(express.static('public'));

//when requests come into the landing page, they get routed to the express router
app.use('/', appRouter);

//log the http layer
app.use(morgan('common'));

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/public/index.html");
// });

let server;

//connects to DB, starts the server and returns a promise > facilitates async testing
function runServer(databaseURL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      databaseURL, err => {
        if(err) {
          return reject(err);
        }
        server = app
        .listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve();
        })
        .on("error", err => {
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

if(require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};
