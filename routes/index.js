// /routes/modules/index.js
const express = require('express');
const router = express.Router();

const restaurants = require('./modules/restaurants');
const home = require('./modules/home');

router.use('/restaurants', restaurants);
router.use('/', home);

module.exports = router;
