const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    /*const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }*/
    const token = req.cookies.jwt;
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: payload.userId, username: payload.username };
        next();
    } catch (error) {
        res.status(401).render('401-error', {});
    }
}

module.exports = auth