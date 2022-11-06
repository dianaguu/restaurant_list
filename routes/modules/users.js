// /routes/modules/users.js
const express = require('express')
const router = express.Router()

// ===========================================================
// Read - Login page
router.get('/login', (req, res) => {
  return res.render('login')
})

module.exports = router
