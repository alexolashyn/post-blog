const Post = require('../models/post');

const itemsOnPage = 4;

const createPost = async (req, res, next) => {
    try {
        const { id, username } = req.user;
        const post = await Post.create({ ...req.body, owner: username, ownerId: id });
        res.status(200).json({ post });
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            req.validErrors = { errors: error.errors };
            return next();
        }
        res.status(500).json({ message: error });
    }
}

// /api/blog/delete-post/:id
const deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
            res.status(404).json({ message: 'Not found' });
            return;
        }
        res.status(200).json({ deletedPost });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}

const viewPosts = async (req, res) => {
    let page = req.query.page;
    if (!page) {
        page = 1;
    }
    let postsData = await Post.find();
    postsData.reverse(); //add createdAt field to mongoose schema
    const allPages = Math.ceil(postsData.length / itemsOnPage);
    postsData = postsData.slice((page - 1) * itemsOnPage, page * itemsOnPage);
    const posts = postsData.map((post) => ({
        id: post._id,
        title: post.title,
        description: post.description,
        owner: post.owner === req.user.username ? 'Me' : post.owner
    }));
    res.status(200).render('posts', { posts: posts, selectedPage: page, allPages: allPages });
}

const viewUserPosts = async (req, res) => {
    const userId = req.user.id;
    const myPostData = await Post.find({ ownerId: userId });
    const posts = myPostData.map((post) => ({
        id: post._id,
        title: post.title,
        description: post.description
    }));
    posts.reverse(); //add createdAt field to mongoose schema
    res.status(200).render('my-posts', { posts });

}

const updatePost = (req, res) => {


}

module.exports = {
    createPost,
    viewPosts,
    viewUserPosts
}