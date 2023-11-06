const express = require('express');
const authRouter = express.Router();

const { loginView, login, signUp, logout, signUpView } = require('../controllers/auth');
const errorsHandler = require('../middleware/validation-errors');

authRouter.route('/login').post(login).get(loginView);
authRouter.route('/sign-up').post(signUp, errorsHandler).get(signUpView);
authRouter.route('/logout').get(logout);

module.exports = authRouter;