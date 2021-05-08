const db = require('../../config/mongoose')
const Restaurant = require('../restaurant') 
const restaurantList = require('./restaurant.json')


db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < restaurantList.results.length; i++) {
    Restaurant.create(restaurantList.results[i])
  }
  console.log('seeder loaded')
})