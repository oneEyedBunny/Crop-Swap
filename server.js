"user strict";

const express = require('express');
const app = express();
app.use(express.static('public'));
const appRouter = require("./appRouter");


if (require.main === module) {
  app.listen(process.env.PORT || 8080, function() {
    console.info(`Your app is listening on ${this.address().port}`);
  });
}

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/public/index.html");
// });
//
// app.use("/posts", appRouter);



module.exports = app;
