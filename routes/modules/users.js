// /routes/modules/users.js
const express = require('express')
const router = express.Router()

const User = require('../../models/user')

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

// Create
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  User.findOne({ email }).then(user => {
    if (user) {
      console.log('Email already exist.')
      res.render('register', {
        name, 
        email, 
        password, 
        confirmPassword
      })
    } else {
      return User.create({
        name,
        email,
        password
      })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
    } 
  })
})

module.exports = router
