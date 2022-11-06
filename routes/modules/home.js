// /routes/modules/home.js
const express = require('express');
const router = express.Router();

const Restaurant = require("../../models/restaurant")

// Read: view all restaurants
router.get("/", (req, res) => {
  Restaurant.find({})
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.log(err))
})

module.exports = router;
