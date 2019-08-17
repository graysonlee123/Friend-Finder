// Requirements
const express = require("express");
const app = express();

const PORT = 8080;

const path = require("path");

const htmlRoutes = require("./app/routing/htmlRoutes.js");

// Server logic

app.use(htmlRoutes);

app.use( "/html", express.static ( path.join( __dirname, "/app/public") ) );

app.listen( PORT, () => console.log("Listening on port " + PORT) );