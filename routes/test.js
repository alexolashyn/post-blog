const express = require('express');
const testRouter = express.Router();

const test = require('../controllers/test');
const auth = require('../middleware/auth');

testRouter.route('/test').get(auth, test);

module.exports = testRouter