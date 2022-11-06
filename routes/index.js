// /routes/modules/index.js
const express = require('express');
const router = express.Router();

const users = require('./modules/users');
const restaurants = require('./modules/restaurants');
const home = require('./modules/home');

router.use('/users', users);
router.use('/restaurants', restaurants);
router.use('/', home);

module.exports = router;
