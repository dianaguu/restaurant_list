// /routes/modules/auth.js
const express = require('express')
const router = express.Router()

const passport = require('passport')

router.get('/facebook',
  passport.authenticate('facebook',));

router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  }));

module.exports = router
