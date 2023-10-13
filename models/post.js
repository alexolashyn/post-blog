const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Post title must be provided'],
        maxlength: 255
    },
    description: {
        type: String,
        required: [true, 'Post description must be provided'],
        maxlength: 10000
    },

    owner: {
        type: String,
        required: [true, 'Owner must be provided']
    },

    ownerId: {
        type: String
    }
});

module.exports = mongoose.model('Posr', postSchema);