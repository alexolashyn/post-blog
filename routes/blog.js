const express = require('express');
const blogRouter = express.Router();

const { createPost, viewPosts, viewUserPosts, deletePost, updatePost } = require('../controllers/blog');
const auth = require('../middleware/auth');
const errorsHandler = require('../middleware/validation-errors');

blogRouter.route('/create-post').post(auth, createPost, errorsHandler);
blogRouter.route('/view-posts').get(auth, viewPosts);
blogRouter.route('/view-user-posts').get(auth, viewUserPosts);
blogRouter.route('/delete-post/:id').delete(auth, deletePost)
blogRouter.route('/update-post/:id').put(auth, updatePost, errorsHandler)

module.exports = blogRouter