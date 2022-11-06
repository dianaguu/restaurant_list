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
  const userId = req.user._id
  return Restaurant.create({ ...req.body, userId})
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

// ===========================================================
// Read - Show page for specific restaurant
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId})
    .lean()
    .then(restaurant => res.render("show", { restaurant }))
    .catch(err => console.log(err))
})

// ===========================================================
// Read - Edit page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error));
})

// Update
router.put("/:id", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const updatedRestaurant = req.body
  return Restaurant.findOneAndUpdate({ userId }, updatedRestaurant, { new: true, useFindAndModify: false })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(err => console.log(err))
})

// ===========================================================
// Delete
router.delete("/:id", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOneAndDelete({ _id, userId })
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

module.exports = router
