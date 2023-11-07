const User = require('../models/user.js');

const signUp = async (req, res, next) => {
    try {
        const user = await User.create({ ...req.body });
        const token = user.createJWT();
        res.cookie('jwt', token, { httpOnly: true }).redirect('/api/blog/view-posts');
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            req.validErrors = { errors: error.errors };
            return next();
        }

        res.status(500).json({ message: error });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(401).render("login", { message: "Provide email and password" });
            return;
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(401).render("login", { message: "Incorrect email" });
            return;
        }

        const isPasswordCorrect = await user.comparePassword(password)
        if (!isPasswordCorrect) {
            res.status(401).render("login", { message: 'Incorrect password' });
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
    res.render("login", { message: "" });
};
const signUpView = (req, res) => {
    res.render("signUp", {message: ""});
};

const logout = (req, res) => {
    res.status(200)
        .cookie('jwt', '', { httpOnly: true })
        .redirect('/api/auth/login');
}

module.exports = {
    loginView,
    login,
    signUp,
    logout,
    signUpView,
}