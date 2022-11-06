// /models/seeds/restaurantSeeder.js
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
};
const Restaurant = require("../restaurant")
const restaurantList = require("../../restaurant.json").results

const db = require('../../configs/mongoose');

db.once("open", () => {
  console.log("[DIANA restaurantSeeders.js] MongoDB connected")

  Restaurant.create(restaurantList)
    .then(() => {
      console.log('[DIANA restaurantSeeders.js] Create 8 seed data done!');
      db.close()
    })
    .catch(err => console.log(err))
})
