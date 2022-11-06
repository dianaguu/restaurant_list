// /routes/modules/restaurant.js
const express = require('express');
const router = express.Router();

const Restaurant = require("../../models/restaurant")

// ===========================================================
// CRUD.
// Read: Create page
router.get('/new', (req, res) => {
  return res.render('new');
})

// Create: create a restaurant
router.post("/", (req, res) => {
  console.log('[DIANA restaurant.js] req.body:', req.body)
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

module.exports = router
