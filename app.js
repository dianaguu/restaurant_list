const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
  console.log('[DIANA app.js] process.env.NODE_ENV:', process.env.NODE_ENV)
}

const routes = require('./routes');
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
// Invoke Primary Router
app.use(routes);
// start server
app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
