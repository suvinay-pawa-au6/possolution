const http = require("http");
const pro = require("./app");
var https = require("https");
const fs = require("fs");
var server = https.createServer(
  {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert"),
  },
  pro
);

server.listen(8000);
