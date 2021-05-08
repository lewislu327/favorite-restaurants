const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')


router.get('/', (req, res) => {
  const keyword = req.query.keyword;
  return Restaurant.find({name:{$regex:keyword,$options:"$i"}})
  .lean()
  .then(restaurant => res.render('index', { restaurant: restaurant })) //insensitive search  
  .catch(error => console.error(error))
})


module.exports = router

