const express = require('express');
const session = require('express-session')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
  console.log('[DIANA app.js] process.env.NODE_ENV:', process.env.NODE_ENV)
}

const routes = require('./routes');
const usePassport = require('./configs/passport');
require('./configs/mongoose');

// express object
const app = express();
const PORT = process.env.PORT;
// ===========================================================
// views: express-handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(express.static("public"))

// ===========================================================
// session: express-session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// ===========================================================
// Parse HTTP request body
app.use(bodyParser.urlencoded({ extended: true }));
// Override HTTP methods using header
app.use(methodOverride('_method'));

// ===========================================================
// Invoke User Authentication
usePassport(app);
// Invoke Flash Messages
app.use(flash());
// Pass Request's data to Response
app.use((req, res, next) => {
  // console.log('[DIANA app.js] req.user: ', req.user)
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// ===========================================================
// Invoke Primary Router
app.use(routes);
// start server
app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
