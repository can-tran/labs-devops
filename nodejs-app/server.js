require('dotenv').config();

var express = require("express");
// var os = require("os");
var app = express();
app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("/", (req, res, next) => {
    res.send(`Welcome to nodejs app service! (ENV: ${process.env.ENV})`)
   });

// const process = require('node:process');

// // Begin reading from stdin so the process does not exit.
// process.stdin.resume();

// process.on('SIGINT', () => {
//     process.exit(1);
//   console.log('Received SIGINT. Press Control-D to exit.');
// });

// // Using a single function to handle multiple signals
// function handle(signal) {
//   console.log(`Received ${signal}`);
// }

// process.on('SIGINT', handle);
// process.on('SIGTERM', handle);