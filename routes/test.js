const express = require('express');
const test = express.Router();

const auth = require('../middleware/auth');
const testCon = require('../controllers/test');

test.route('/test').post(auth, testCon.posting).get(auth, testCon.getting);

module.exports = test