// /routes/modules/restaurant.js
const express = require('express');
const router = express.Router();

const Restaurant = require("../../models/restaurant")

// ===========================================================
// CRUD
// Read: Create page
router.get('/new', (req, res) => {
  return res.render('new');
})

// Create: create a restaurant
router.post("/", (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

// ===========================================================
// Read - Show page for specific restaurant
router.get('/:id', (req, res) => {
  const restaurantId = req.params.id
  return Restaurant.findById(restaurantId)
    .lean()
    .then(restaurant => {
      console.log('[DIANA restaurant.js] restaurant:', restaurant)
      res.render("show", { restaurant })})
    .catch(err => console.log(err))
})

// ===========================================================
// Read - Edit page
router.get('/:id/edit', (req, res) => {
  const restaurantId = req.params.id;
  return Restaurant.findById(restaurantId)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error));
})

// Update
router.put("/:id", (req, res) => {
  const restaurantId = req.params.id;
  return Restaurant.findByIdAndUpdate(restaurantId, req.body)
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch(err => console.log(err))
})

// ===========================================================
// Delete
router.delete("/:id", (req, res) => {
  const restaurantId = req.params.id;
  return Restaurant.findByIdAndDelete(restaurantId)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

module.exports = router
