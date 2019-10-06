const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Your name is required!'],
        validate: {
            validator: function(v) {
                const nameChecker = /^[a-zA-Z ]+$/;
                return nameChecker.test(v);
            },
            message: props => `"${props.value}" is not a valid name! Remove symbols and numbers.`
        }
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now()
    },
    scores: {
        type: Array,
        required: true
    },
    profileImage: {
        type: String,
        required: [true, 'Your avatar is required!']
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        validate: {
            validator: function(v) {
                const emailChecker = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;
                return emailChecker.test(v);
            },
            message: props => `"${props.value}" is not a valid email!`
        }
    }
});

// Construct the Friend model
const Friend = mongoose.model('Friend', FriendSchema);

module.exports = Friend;