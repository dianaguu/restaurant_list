// configs/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local');
const FacebookStrategy = require('passport-facebook')
const bcrypt = require('bcryptjs')
const User = require('../models/user');

module.exports = app => {
  // initialize Passport module
  app.use(passport.initialize());
  app.use(passport.session());

  // invoke local strategy
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true },
    (req, email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return done(null, false, req.flash('warning_msg', 'That email is not registered!'))
          }
          return bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch) {
              return done(null, false, req.flash('warning_msg', 'Email or Password incorrect.'))
            }
            return done(null, user)
          })
        })
        .catch(err => done(err, false));
    }));

  // invoke Facebook strategy
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    const { email, name } = profile._json
    User.findOne({ email })
      .then(user => {
        if (user) return done(null, user)
        const randomPassword = Math.random().toString(36).slice(-8)
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({
            email,
            name,
            password: hash
          }))
          .then(user => done(null, user))
          .catch(err => done(err, false))
      })
  }))

  // set serializeUser and a deserializeUser function
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user =>
        done(null, user))
      .catch(err => done(err, null));
  });
}
