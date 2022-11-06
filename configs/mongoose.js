// /configs/mongoose.js
// connect to DB: mongoose
const mongoose = require('mongoose');

console.log('process.env.MONGODB_URI: ', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const db = mongoose.connection;  // create mongoose.connect() object

db.on('error', () => {  // listen for "error" event
  console.log('[DIANA mongoose.js] MongoDB error!');
});
db.once('open', () => { // listen for "open" event one-time
  console.log('[DIANA mongoose.js] MongoDB connected!');
});

module.exports = db
