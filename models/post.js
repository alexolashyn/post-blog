const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title must be provided'],
        minlength: [1, 'Title must be at least 1 characters long'],
    },

    description: {
        type: String,
        required: [true, 'Description must be provided'],
        minlength: [1, 'Title must be at least 1 characters long'],
    },

    owner: {
        type: String,
        required: [true, 'Owner must be provided']
    },

    ownerId: {
        type: String,
        required: [true, 'OwnerId must be provided']
    }
});

module.exports = mongoose.model('Post', postSchema);