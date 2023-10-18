const User = require('../models/user.js');

const signUp = async (req, res) => {
    try {
        const user = await User.create({ ...req.body });
        const token = user.createJWT();
        res.status(200).json({ user: { username: user.username }, token: token });
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            const validationErrors = {};
            for (const field in error.errors) {
                validationErrors[field] = error.errors[field].message;
            }
            res.status(401).json({ message: validationErrors });
            return;
        }

        res.status(500).json({ message: error });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(401).json({ message: "Provide email and password" });
            return;
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(401).json({ message: 'Incorrect email' });
            return;
        }

        const isPasswordCorrect = await user.comparePassword(password)
        if (!isPasswordCorrect) {
            res.status(401).json({ message: 'Incorrect password' });
            return;
        }

        const token = user.createJWT();
        res.cookie('jwt', token, { httpOnly: true }).redirect('/api/blog/view-posts');
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}

const loginView = (req, res) => {
    res.render("login", {});
};

module.exports = {
    loginView,
    login,
    signUp,
}