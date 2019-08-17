const express = require("express");
const app = module.exports = express();

const path = require("path");

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../public/home.html")));

app.get("/survey", (req, res) => res.sendFile(path.join(__dirname, "../public/survey.html")));

app.get("/master.css", (req, res) => res.sendFile(path.join(__dirname, "../public/master.css")));
app.get("/reset.css", (req, res) => res.sendFile(path.join(__dirname, "../public/reset.css")));