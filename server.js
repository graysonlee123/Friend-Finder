const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './app/public')));

mongoose.connect('mongodb://localhost/friend-match', {useNewUrlParser: true});
const db = mongoose.connection;

require('./app/routing/api.friends')(app);
require('./app/routing/routes.html')(app);

const PORT = process.env.PORT || 8000;

db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', () => {
    console.log('Connected to the database!');

    app.listen(PORT, function () {
        console.log('App listening on PORT: ' + PORT);
    });
});