const express = require('express');
const authRouter = express.Router();

const {loginView, login, signUp} = require('../controllers/auth');

authRouter.route('/login').post(login).get(loginView);
authRouter.route('/sign-up').post(signUp);

module.exports = authRouter