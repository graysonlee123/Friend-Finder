const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    imageName: {
        type: String,
        default: 'none',
        required: true
    },
    imageData: {
        type: String,
        required: true
    }
});

// Construct the Image model
const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;