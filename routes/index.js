// /routes/modules/index.js
const express = require('express');
const router = express.Router();

const users = require('./modules/users');
const restaurants = require('./modules/restaurants');
const home = require('./modules/home');
const auth = require('./modules/auth');

const { authenticator } = require('../middlewares/auth')

router.use('/users', users);
router.use('/restaurants', authenticator, restaurants);
router.use('/auth', auth);
router.use('/', authenticator, home);

module.exports = router;
