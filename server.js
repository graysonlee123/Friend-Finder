require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8000;
const db = mongoose.connection;
const {NODE_ENV, TEST_DB, DEVELOPMENT_DB, DB_URI} = process.env;

let dbString;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './app/public')));
app.use('/uploads', express.static('uploads'));

if (NODE_ENV === 'test') dbString = TEST_DB;
else if (NODE_ENV === 'development') dbString = DEVELOPMENT_DB;
else if (NODE_ENV === 'production') dbString = DB_URI;
else throw console.log("Needs a database to connect to!");

mongoose.connect(dbString, {useNewUrlParser: true});

require('./app/routing/api.friends')(app);
require('./app/routing/api.images')(app);
require('./app/routing/routes.html')(app);

db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', () => {
    console.log('Connected to the database!');

    app.listen(PORT, function () {
        console.log('App listening on PORT: ' + PORT);
    });
});