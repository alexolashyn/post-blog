const Post = require('../models/post');

const createPost = async (req, res) => {
    try {
        const { id, username } = req.user;
        const { title, description } = req.body;
        const post = await Post.create({ title: title, description: description, owner: username, ownerId: id });
        res.status(200).json({ post });
        return;
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            const validationErrors = {};

            for (const field in error.errors) {
                validationErrors[field] = error.errors[field].message;
            }

            res.status(400).json({ message: validationErrors });
            return;
        }
        res.status(500).json({ message: error });
    }
}

const viewAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        const resPosts = posts.map((post) => ({
            title: post.title,
            description: post.description,
            owner: post.owner
        }));
        res.status(200).render('all-posts', {resPosts});
        return;
    }
    catch (error) {
        res.status(500).json({ message: error });
    }

}

//delete

module.exports = {
    createPost,
    viewAllPosts
}