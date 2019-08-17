const express = require("express");
const app = module.exports = express();

const path = require("path");

const friends = require("../data/friends.js")

app.get("/api/friends", (req, res) => res.json(friends) );

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/friends", (req, res) => {
    const newPost = req.body;
    console.log(newPost);
    res.json(newPost);
    friends.push(newPost);
});