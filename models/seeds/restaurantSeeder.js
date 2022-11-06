// /models/seeds/restaurantSeeder.js
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
};
const Restaurant = require("../restaurant")
const restaurantList = require("../../restaurant.json").results

const User = require('../user')
const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    index: [0, 1, 2]
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    index: [3, 4, 5]
  }
]

const db = require('../../configs/mongoose');
db.once('open', () => {
  console.log('MongoDB connected');
  Promise.all(SEED_USER.map(user => {
    const { name, email, password, index } = user
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then((user) => {
        const userId = user._id
        const restaurants = index.map(idx => {
          const restaurant = ({ ...restaurantList[idx], userId })
          return restaurant
        })
        return new Promise(() => {
          Restaurant.create(restaurants)
          console.log('Create Seed Data')
          // Promise not handle well, need to check why
        })
      })
      .then(() => {
        console.log('Exit')
        process.exit()
      })
  }))
});
