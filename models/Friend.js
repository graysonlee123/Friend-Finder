const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true
    },
    scores: {
        type: Array,
        required: true
    }
});

// Construct the Friend model
const Friend = mongoose.model('Friend', FriendSchema);

module.exports = Friend;