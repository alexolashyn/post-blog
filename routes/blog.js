const express = require('express');
const blogRouter = express.Router();

const auth = require('../middleware/auth');
const { createPost, viewAllPosts } = require('../controllers/blog');

blogRouter.route('/create-post').post(auth, createPost);
blogRouter.route('/view-posts').get(auth, viewAllPosts);

module.exports = blogRouter;