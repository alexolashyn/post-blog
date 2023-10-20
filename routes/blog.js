const express = require('express');
const blogRouter = express.Router();

const { createPost, viewPosts } = require('../controllers/blog');
const auth = require('../middleware/auth');
const errorsHandler = require('../middleware/validation-errors');

blogRouter.route('/create-post').post(auth, createPost, errorsHandler);
blogRouter.route('/view-posts').get(auth, viewPosts);

module.exports = blogRouter