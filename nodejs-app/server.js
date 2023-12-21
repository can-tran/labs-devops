require('dotenv').config();

var express = require("express");
// var os = require("os");
var app = express();
var port = 3000;
app.listen(port, () => {
console.log(`Server running on port ${port}`);
});

app.get("/", (req, res, next) => {
    res.send(`Welcome to nodejs app service! (ENV: ${process.env.ENV})`)
});
