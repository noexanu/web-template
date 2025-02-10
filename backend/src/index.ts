import express from "express";

const server = express();

server.get("/", function (req, res) {
  res.send("Hello World");
});

server.listen(3000);
