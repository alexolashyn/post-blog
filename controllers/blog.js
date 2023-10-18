const Post = require('../models/post');

const createPost = async (req, res) => {
    try {
        const { id, username } = req.user;
        const post = await Post.create({ ...req.body, owner: username, ownerId: id });
        res.status(200).json({ post });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }


}

const deletePost = (req, res) => {

}

const viewPosts = async (req, res) => {
    const postsData = await Post.find();
    const posts = postsData.map((post) => ({
        title: post.title,
        description: post.description,
        owner: post.owner === req.user.username ? 'Me' : post.owner
    }));
    posts.reverse(); //add createdAt field to mongoose schema
    res.status(200).render('posts', {posts});
}

const viewPost = (req, res) => {

}

module.exports = {
    createPost,
    viewPosts,
}