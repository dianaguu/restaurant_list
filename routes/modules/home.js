// /routes/modules/home.js
const express = require('express');
const router = express.Router();

const Restaurant = require("../../models/restaurant")

// ===========================================================
// CRUD.
// Read: view all restaurants
router.get("/", (req, res) => {
  Restaurant.find({})
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.log(err))
})

// Update: search restaurant by keywords (without sort)
router.get("/search", (req, res) => {
  // console.log('[DIANA home.js] req.query:', req.query)
  const keywords = req.query.keywords
  if (!keywords) {
    return res.redirect("/")
  }

  const keyword = req.query.keywords.trim().toLowerCase()
  Restaurant.find({})
    .lean()
    .then(restaurants => {
      const filterRestaurantsData = restaurants.filter(
        data =>
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
      )
      res.render("index", { restaurants: filterRestaurantsData })
    })
    .catch(err => console.log(err))
})

module.exports = router;
