// /routes/modules/users.js
const express = require('express')
const router = express.Router()

// ===========================================================
// CRUD
// Read - Login page
router.get('/login', (req, res) => {
  return res.render('login')
})

// ===========================================================
// Read - Register page
router.get('/register', (req, res) => {
  return res.render('register');
})

module.exports = router
