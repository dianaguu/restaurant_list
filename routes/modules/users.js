// /routes/modules/users.js
const express = require('express')
const router = express.Router()

const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')

// ===========================================================
// CRUD
// Read - Login page
router.get('/login', (req, res) => {
  return res.render('login')
})

// Update
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
  })
);

// ===========================================================
// Read - Register page
router.get('/register', (req, res) => {
  return res.render('register');
})

// Create
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // error messages
  const errors = []
  if (!email) {
    errors.push({ message: 'Email field are required.' })
  }
  if (!password || !confirmPassword) {
    errors.push({ message: 'Both passwords fields are required.' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: 'Password and Confirmed Password are mismatch.' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: 'Email already exist.' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
})

// ===========================================================
// Read - Logout page
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'Logout successfully!')
  res.redirect('/users/login');
})

module.exports = router
