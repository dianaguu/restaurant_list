// configs/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');

module.exports = app => {
  // initialize Passport module
  app.use(passport.initialize());
  app.use(passport.session());

  // invoke local strategy
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) { return done(null, false, { message: 'That email is not registered!' }) }
        if (user.password !== password) { return done(null, false, { message: 'Email or Password incorrect.' }) }
        return done(null, user)
      })
      .catch(err => done(err, false));
  }));

  // set serializeUser and a deserializeUser function
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user =>
        done(null, user))
      // console.log('[DIANA passport.js] user: ', user)})
      .catch(err => done(err, null));
  });
}
