require('dotenv').config();

var express = require("express");
var uuid = require("uuid");
// var os = require("os");
var app = express();
var port = process.env.API_PORT || 3000;
const instanceId = uuid.v4();
app.listen(port, () => {
console.log(`Server running on port ${port} - instance: ${instanceId}`);
});

app.get("/", (req, res, next) => {
    res.send(`Welcome to nodejs app service! (ENV: ${process.env.ENV}) - ${instanceId}`)
});
