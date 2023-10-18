const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title must be provided']
    },

    description: {
        type: String,
        required: [true, 'Description must be provided']
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