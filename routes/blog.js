const express = require('express');
const blogRouter = express.Router();

const { createPost, viewPosts } = require('../controllers/blog');
const auth = require('../middleware/auth');

blogRouter.route('/create-post').post(auth, createPost);
blogRouter.route('/view-posts').get(auth, viewPosts);

module.exports = blogRouter