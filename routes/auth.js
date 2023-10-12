const express = require('express');
const authRouter = express.Router();

const auth = require('../controllers/auth');

authRouter.route('/login').post(auth.login);
authRouter.route('/sign-up').post(auth.signUp);

module.exports = authRouter