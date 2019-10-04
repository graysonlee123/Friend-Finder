const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './app/public')));

mongoose.connect('mongodb://localhost/friend-match', {useNewUrlParser: true});

require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);

const PORT = process.env.PORT || 8000;

app.listen(PORT, function () {
    console.log('App listening on PORT: ' + PORT);
});