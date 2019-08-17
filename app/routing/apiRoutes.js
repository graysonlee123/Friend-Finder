const express = require("express");
const app = module.exports = express();

const path = require("path");

const friends = require("../data/friends.js")

app.get("/api/friends", (req, res) => res.json(friends) );

app.post("/api/friends", (req, res) => console.log(req.body));