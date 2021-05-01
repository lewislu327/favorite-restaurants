const mongoose = require('mongoose')
const Restaurant = require('../restaurant') 
const restaurantList = require('./restaurant.json')

mongoose.connect('mongodb://localhost/favorite_restaurants', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})


const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < restaurantList.results.length; i++) {
    Restaurant.create(restaurantList.results[i])
  }
})